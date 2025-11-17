import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useBillerMutation } from "../slices/usersApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Pagination, Spin } from "antd";
import { current } from "@reduxjs/toolkit";

export default function Utilities() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [pageNumber,setPageNumber] = useState(1)
  const [recordPerPage,setRecordPerPage] = useState(10)
  const { id } = useParams();

  const [biller, { isLoading }] = useBillerMutation();

  // ✅ useCallback ensures function identity is stable and not recreated every render
  const getBiller = useCallback(async () => {
    try {
      const resp = await biller({ categoryKey: id,pageNumber:pageNumber,recordPerPage:recordPerPage }).unwrap();
      console.log(pageInfo);

      if (resp?.data?.records) {
        setServices(resp.data.records);
        setPageInfo(resp.data.meta || {});
        toast.success(resp.status || "Biller data loaded");
      } else {
        toast.info("No billers found");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to load billers");
      console.error("Biller fetch error:", error);
    }
  }, [biller, id,pageNumber,recordPerPage]);

  // ✅ useEffect with correct dependencies
  useEffect(() => {
    getBiller();
  }, [getBiller]);

  // ✅ useMemo to optimize rendering of service count or other derived data
  const totalRecords = useMemo(() => pageInfo?.totalRecords || services.length, [pageInfo, services]);
  const handlePage=(current,size)=>{
    setPageNumber(current)
    setRecordPerPage(size)
    console.log("step 2",size);

  }

  return (
    <>
      {isLoading ? (
        <div className="text-center p-5">
          <Spin size="large" />
        </div>
      ) : (
        <div className="bill-payment-container container mt-4">
          <h4 className="mb-3">Services & Payments</h4>

          <div className="big-box p-4 rounded shadow-sm" style={{maxHeight:'60vh',overflowY:'auto'}}>
            <div className="icon-grid">
              {services.map((service, index) => (
                <div
                  key={service.billerId || index}
                  className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex flex-column align-items-center justify-content-center"
                  style={{ cursor: "pointer" }}
                  onClick={()=>navigate(`/dashboard/billpayments/${service.billerId}`)}
                >
                  <img src={service.iconUrl} alt={service.billerName} className="bill-icon mb-2" />
                  <div className="icon-label" style={{width:'100%',fontSize:13,whiteSpace:'nowrap',overflow:"hidden",textOverflow:'ellipsis'}}>{service.billerName}</div>
                </div>
              ))}
            </div>
          </div>

          <Pagination
            showTotal={(total,range) => `${range[0]}-${range[1]} of ${total} items`}
            pageSize={recordPerPage}
            current={pageNumber}
            total={totalRecords}
            onChange={handlePage}
            showQuickJumper
            showSizeChanger
          />
        </div>
      )}
    </>
  );
}
