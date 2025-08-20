import React, { useEffect, useState } from 'react';
import '../styles/RetailerDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useRetailerMutation } from "../slices/usersApiSlice";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function RetailerDashboard() {
  const [cBalance,setCBalance] = useState(0)
  const [bName,setBName] = useState('')
  const navigate = useNavigate();
  const [retailer] = useRetailerMutation()
  const {userInfo} = useSelector((state)=>state.auth)

  useEffect(()=>{
    const fetchDashboard = async () => {
      try {
        const response = await retailer({customerID:userInfo.id})
        setCBalance(response.data.wallet?.wallet_balance)
        setBName(response.data.wallet?.business_name)

      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message)

      }

    }
    fetchDashboard()
  },[])
  return (
    <div className="retailer-dashboard-container">
      <div className="mb-4">
        <h4>Hello, <strong>{bName}</strong> 👋</h4>
        <small className="text-muted">What bill will you be paying today?</small>
      </div>

      {/* Wallet + Stats */}
      <div className="row g-3 mb-3">
        {/* Current Balance */}
        <div className="col-md-4">
          <div className="border rounded p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Current Balance</h6>
            </div>
            <div className="d-flex align-items-center mb-2">
              <img src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/WALLET-2.png" alt="Wallet" className="walleticon" />
              <h4 className="ms-3 mb-0">{cBalance}</h4>
            </div>
            <button
              className="btn small-rounded-button btn-sm px-3"
              onClick={() => navigate('/dashboard/addbalance')}
            >
               Get Payment
            </button>
          </div>
        </div>

        {/* Revenue */}
        <div className="col-md-4">
          <div className="border rounded p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Revenue</h6>
              <select className="form-select form-select-sm w-auto">
                <option>Today</option>
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <div className="d-flex align-items-center mb-2">
              <img src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/Revenue.png" alt="Revenue" className="revenuicon" />
              <h4 className="ms-3 mb-0">57500.90</h4>
            </div>
            <button
              className="btn small-rounded-button btn-sm px-3"
              onClick={() => navigate('/dashboard/reports/transactionhistory')}
            >
              Go to History
            </button>
          </div>
        </div>

        {/* Settlements */}
        {/* <div className="col-md-4">
          <div className="border rounded p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Settlements</h6>
              <select className="form-select form-select-sm w-auto">
                <option>Today</option>
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <div className="d-flex align-items-center mb-2">
              <img src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/settlements.png" alt="Settlements" className="settlements" />
              <h4 className="ms-3 mb-0">{cBalance}</h4>
            </div>
            <button
              className="bbtn small-rounded-button btn-sm px-3"
             onClick={() => navigate('/dashboard/banktransfer')}
            >
               Settle Now
            </button>
          </div>
        </div> */}
      </div>

      {/* Bill Services */}
      <div className="border rounded p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">Bill Payments</h6>
          <button
            className="btn btn-outline-secondary btn-sm view-all-button"
            onClick={() => navigate('/dashboard/BillPayments')}
          >
            View All Services
          </button>
        </div>

        <div className="services-grid">
          {[
            { label: 'Vendor Payments', path: '/dashboard/banktransfer', icon: 'vendor+payments.png' },
            { label: 'Get POS Machine', path: '/dashboard/reports/comingsoon', icon: 'POS_Machine.png' },
            { label: 'Get QR Code', path: '/dashboard/reports/comingsoon', icon: 'QRCode.png' },
            { label: 'Fast Tag', path: '/dashboard/reports/comingsoon', icon: 'Fast+Tag.png' },
            { label: 'Electricity', path: '/dashboard/reports/comingsoon', icon: 'Electricity_Bill.png' },
            { label: 'Mobile', path: '/dashboard/reports/comingsoon', icon: 'Recharge.png' },
            { label: 'Credit Card', path: '/dashboard/reports/comingsoon', icon: 'Credit_Card.png' },
            { label: 'Broad Band', path: '/dashboard/reports/comingsoon', icon: 'Broadband.jpeg' },
            { label: 'Loan Repayment', path: '/dashboard/reports/comingsoon', icon: 'Loan+EMI.png' },
            { label: 'DTH', path: '/dashboard/reports/comingsoon', icon: 'DTH.png' },
            { label: 'Tax', path: '/dashboard/reports/comingsoon', icon: 'Tax.png' },
            { label: 'Water', path: '/dashboard/reports/comingsoon', icon: 'water.png' },
          ].map((service, index) => (
            <button
              key={index}
              className="btn btn-outline-primary service-button"
              onClick={() => navigate(service.path)}
            >
              <div className="d-flex flex-column align-items-center">
                <img
                  src={`https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/${service.icon}`}
                  alt={service.label}
                  className="service-icon-viewmore"
                />
                 <span>{service.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>


      {/* Recent Transactions */}
      <div className="border rounded p-3 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">Recent Transaction</h6>
          <div className="d-flex gap-2">
            <select className="form-select form-select-sm w-auto">
              <option>Today</option>
              <option>This Month</option>
            </select>
            <button className="btn btn-outline-primary btn-sm px-3">Export</button>
          </div>
        </div>

        <table className="table table-sm text-center">
          <thead>
            <tr>
              <th>Transaction type</th>
              <th>Amount</th>
              <th>Transaction date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" className="text-center py-4">
                <div className="text-muted">No recent activity to show here.<br />Get started by making a transaction</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="retailer-footer">
        All rights reserved © 2025 NeoFin Nex India Pvt Ltd
      </div>
    </div>
  );
}
