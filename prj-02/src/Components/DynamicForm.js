import React, { useState, useCallback, useEffect } from "react";
import {
  useBillerDetailsMutation,
  useBillerEnquiryMutation,
} from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const getType = (inputType) => {
  switch (inputType) {
    case "NUMERIC":
      return "tel";
    case "TEXT":
      return "text";
    case "PASSWORD":
      return "password";
    default:
      return "text";
  }
};

const validate = (param, value) => {
  if (param.mandatory && !value) return `${param.desc} is mandatory`;
  if (param.minLength && value?.length < param.minLength)
    return `Minimum length is ${param.minLength}`;
  if (param.maxLength && value?.length > param.maxLength)
    return `Maximum length is ${param.maxLength}`;
  if (param.regex && value && !new RegExp(param.regex).test(value))
    return `Invalid ${param.desc}`;
  return null;
};

/* --- Bill Details Card Component --- */
const BillDetailsCard = ({ bill }) => {
  if (!bill) return null;

  return (
    <div
      className="card shadow-sm rounded-3 p-3 mt-4"
      style={{ width: "350px", maxWidth: "100%", fontSize: "0.9rem" }}
    >
      <h6 className="fw-bold text-uppercase mb-3 border-bottom pb-2 text-primary">
        Bill Details
      </h6>
      <div className="d-flex flex-column gap-1">
        <div>
          <strong>Customer Name:</strong>{" "}
          <span>{bill.CustomerName || "-"}</span>
        </div>
        <div>
          <strong>Bill Number:</strong> <span>{bill.BillNumber || "NA"}</span>
        </div>
        <div>
          <strong>Bill Period:</strong> <span>{bill.BillPeriod || "NA"}</span>
        </div>
        <div>
          <strong>Bill Date:</strong> <span>{bill.BillDate || "-"}</span>
        </div>
        <div>
          <strong>Bill Due Date:</strong>{" "}
          <span>{bill.BillDueDate || "-"}</span>
        </div>
        <div>
          <strong>Bill Amount:</strong>{" "}
          <span className="fw-semibold text-danger">
            ₹{bill.BillAmount || "0.00"}
          </span>
        </div>

        {/* --- Customer Params --- */}
        {bill.CustomerParamsDetails?.length > 0 && (
          <>
            <hr />
            <h6 className="fw-bold text-primary mt-2">Customer Details</h6>
            {bill.CustomerParamsDetails.map((p, idx) => (
              <div key={idx}>
                <strong>{p.Name}:</strong> <span>{p.Value}</span>
              </div>
            ))}
          </>
        )}

        {/* --- Additional Details --- */}
        {bill.AdditionalDetails?.length > 0 && (
          <>
            <hr />
            <h6 className="fw-bold text-primary mt-2">Additional Details</h6>
            {bill.AdditionalDetails.map((a, idx) => (
              <div key={idx}>
                <strong>{a.Name}:</strong>{" "}
                <span
                  className={
                    a.Name.toLowerCase().includes("amount")
                      ? "fw-semibold text-danger"
                      : ""
                  }
                >
                  ₹{a.Value}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default function DynamicForm({ schema, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [parameters, setParameters] = useState([]);
  const [billDetails, setBillDetails] = useState(null);
  const [amount, setAmount] = useState("");
  const [enquiryReferenceId,setEnquiryReferenceId] =useState("")
  const [step, setStep] = useState("FETCH");
  const [loading, setLoading] = useState({ biller: false, bill: false });

  const [billerDetails] = useBillerDetailsMutation();
  const [billerEnquiry] = useBillerEnquiryMutation();

  const getBillerDetails = useCallback(async () => {
    setLoading((prev) => ({ ...prev, biller: true }));
    try {
      const resp = await billerDetails({ billerId: schema }).unwrap();
      if (resp?.data?.parameters) {
        setParameters(resp.data.parameters);
        toast.success(resp.status || "Biller data loaded");
      } else {
        toast.info("No billers found");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to load billers");
      console.error("Biller fetch error:", error);
    } finally {
      setLoading((prev) => ({ ...prev, biller: false }));
    }
  }, [billerDetails, schema]);

  useEffect(() => {
    getBillerDetails();
  }, [getBillerDetails]);

  const handleChange = (e, param) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(param, value) }));
  };

  const handleFetchBill = async (e) => {
    e.preventDefault();

    const invalid = parameters.find(
      (param) => validate(param, formData[param.name]) !== null
    );
    if (invalid) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    setLoading((prev) => ({ ...prev, bill: true }));

    try {
      const resp = await billerEnquiry({
        billerId: schema,
        ...formData,
      }).unwrap();

      if (resp?.statuscode === "TXN") {
        const data = resp.data;
        const billData = {
          CustomerName: data?.CustomerName,
          BillNumber: data?.BillNumber,
          BillPeriod: data?.BillPeriod,
          BillDate: data?.BillDate,
          BillDueDate: data?.BillDueDate,
          BillAmount: data?.BillAmount,
          CustomerParamsDetails: data?.CustomerParamsDetails || [],
          AdditionalDetails: data?.AdditionalDetails || [],
        };

        setBillDetails(billData);
        setAmount(data?.BillAmount || "0");
        setEnquiryReferenceId(data?.enquiryReferenceId)
        setStep("BILL");
        toast.success(resp?.status || "Bill fetched successfully");
      } else {
        toast.warn("No bill found or invalid details");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to fetch bill");
      console.error("Bill fetch error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, bill: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ ...formData, amount,enquiryReferenceId,schema });
  };

  const Spinner = ({ text }) => (
    <div className="d-flex align-items-center justify-content-center gap-2">
      <div className="spinner-border spinner-border-sm text-light" role="status" />
      <span>{text}</span>
    </div>
  );

  return (
    <div className="d-flex flex-column align-items-start">
      {loading.biller && (
        <div className="text-center w-100 mb-3">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2 mb-0 text-muted">Loading biller details...</p>
        </div>
      )}

      {!loading.biller && (
        <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: 400 }}>
          {parameters.map((param) => (
            <div className="mb-3" key={param.name}>
              <label className="form-label fw-semibold">{param.desc}</label>
              <input
                type={getType(param.inputType)}
                name={param.name}
                value={formData[param.name] || ""}
                required={!!param.mandatory}
                minLength={param.minLength}
                maxLength={param.maxLength}
                pattern={param.regex}
                className={`form-control${errors[param.name] ? " is-invalid" : ""}`}
                onChange={(e) => handleChange(e, param)}
                disabled={loading.bill}
              />
              {errors[param.name] && (
                <div className="invalid-feedback">{errors[param.name]}</div>
              )}
            </div>
          ))}

          {step === "BILL" && (
            <div className="mb-3">
              <label className="form-label fw-semibold">Amount</label>
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-control"
                disabled={loading.bill}
              />
            </div>
          )}

          {step === "FETCH" ? (
            <button
              className="btn btn-primary w-100 mt-2"
              onClick={handleFetchBill}
              disabled={loading.bill}
            >
              {loading.bill ? <Spinner text="Fetching Bill..." /> : "Fetch Bill"}
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-success w-100 mt-2"
              disabled={loading.bill}
            >
              {loading.bill ? <Spinner text="Processing..." /> : "Proceed to Pay"}
            </button>
          )}
        </form>
      )}

      {billDetails && <BillDetailsCard bill={billDetails} />}
    </div>
  );
}
