import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useBillerMutation } from "../slices/usersApiSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Pagination, Spin } from "antd";

export default function Utilities() {
  const [services, setServices] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const { id } = useParams();

  const [biller, { isLoading }] = useBillerMutation();

  // ✅ useCallback ensures function identity is stable and not recreated every render
  const getBiller = useCallback(async () => {
    try {
      const resp = await biller({ categoryKey: id }).unwrap();
      if (resp?.data?.records) {
        setServices(resp.data.records);
        setPageInfo(resp.data.meta);
        toast.success(resp.status || "Biller data loaded");
      } else {
        toast.info("No billers found");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to load billers");
      console.error("Biller fetch error:", error);
    }
  }, [biller, id]);

  // ✅ useEffect with correct dependencies
  useEffect(() => {
    getBiller();
  }, [getBiller]);

  // ✅ useMemo to optimize rendering of service count or other derived data
  const totalRecords = useMemo(() => pageInfo?.total || services.length, [pageInfo, services]);

  return (
    <>
      {isLoading ? (
        <div className="text-center p-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className="bill-payment-container container mt-4">
          <h4 className="mb-3">Services & Payments</h4>

          <div className="big-box p-4 rounded shadow-sm">
            <div className="icon-grid">
              {services.map((service, index) => (
                <div
                  key={service.billerId || index}
                  className="icon-box text-center"
                  style={{ cursor: "pointer" }}
                >
                  <img src={service.iconUrl} alt={service.billerName} className="bill-icon" />
                  <div className="icon-label">{service.billerName}</div>
                </div>
              ))}
            </div>
          </div>

          <Pagination
            showTotal={(total) => `Total ${total} items`}
            defaultPageSize={10}
            defaultCurrent={1}
            total={totalRecords}
          />
        </div>
      )}
    </>
  );
}
