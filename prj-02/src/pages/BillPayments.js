import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";  // 👈 to get role from Redux
import '../styles/BillPayments.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCategoryMutation } from "../slices/usersApiSlice";
export default function BillPayments() {
  const [services,setServices] = useState([])
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth); // get role

  const [category] = useCategoryMutation()

  useEffect(()=>{
    const getCategories = async () => {
      const resp = await category().unwrap()
      setServices(resp.data)
    }
    getCategories()
  },[])


  return (
    <div className="bill-payment-container container mt-4">
      <h4 className="mb-3">Services & Payments</h4>

      <div className="big-box p-4 rounded shadow-sm">
        <div className="icon-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="icon-box text-center"
              onClick={() => navigate(`/dashboard/billpayments/category/${service.categoryKey}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={service.iconUrl} alt={service.categoryName} className="bill-icon" />
              <div className="icon-label">{service.categoryName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
