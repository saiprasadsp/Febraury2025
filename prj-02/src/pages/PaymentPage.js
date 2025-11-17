import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DynamicForm from "../Components/DynamicForm";
import { useBillerPaymentMutation } from "../slices/usersApiSlice";

export default function PaymentPage() {
  const { id: billerId } = useParams();
  const [billerPayment, { isLoading }] = useBillerPaymentMutation();

  const [billDetails, setBillDetails] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  // Step 1: Handle form submission (from DynamicForm)
  const handleSubmit = useCallback((formData) => {
    setBillDetails(formData);
    setShowPayment(true);
  }, []);

  // Step 2: Handle Payment
  const handlePayment = useCallback(async () => {
    if (!billDetails) {
      toast.error("Bill details missing!");
      return;
    }

    try {
      if (!navigator.geolocation) {
        toast.error("Geolocation not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const resp = await billerPayment({billerId:billDetails.schema, enquiryReferenceId:billDetails.enquiryReferenceId, param1:billDetails.param1, param2:billDetails.param2, amount:billDetails.amount, latitude:latitude.toFixed(4), longitude:longitude.toFixed(4)}).unwrap();
            if (resp?.statuscode === "TXN") {
              toast.success("Payment Successful!");
            } else {
              toast.error(resp?.status || "Payment Failed");
            }
          } catch (err) {
            toast.error(err?.data?.message || "Payment request failed");
            console.error("Payment Error:", err);
          }
        },
        (error) => {
          console.error(error);
          toast.error("Failed to get location.");
        }
      );
    } catch (err) {
      console.error("Error:", err);
      toast.error("Unexpected error occurred during payment.");
    }
  }, [billerPayment, billDetails, billerId]);

  return (
    <div className="container mt-4">
      <h4 className="mb-3 text-primary">Pay your bill - {billerId}</h4>

      {!showPayment ? (
        <DynamicForm schema={billerId} onSubmit={handleSubmit} />
      ) : (
        <div className="p-4 border rounded shadow-sm text-center bg-light">
          <h5 className="fw-semibold mb-3">Confirm Payment</h5>
          <div className="text-start bg-white p-3 rounded">
            <pre className="small mb-0">{JSON.stringify(billDetails, null, 2)}</pre>
          </div>

          <button
            className="btn btn-success mt-3 px-4"
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      )}
    </div>
  );
}
