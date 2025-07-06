import React from 'react';
import '../styles/RetailerDashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Wallet from "../assets/Retailer/Wallet.png";

export default function RetailerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="retailer-dashboard-container">
      <div className="mb-4">
        <h4>Hello, <strong>M09876</strong> 👋</h4>
        <small className="text-muted">What bill will you be paying today?</small>
      </div>

      {/* Wallet + Stats */}
      <div className="row g-3 mb-3">
        <div className="col">
          <div className="bg-primary text-white rounded p-3 h-100">
            <h6>Current Balance</h6>
            <div className="d-flex align-items-center mb-2">
              <img src={Wallet} alt="Wallet" className="service-icon" />
              <h4 className="ms-3 mb-0">0.00</h4>
            </div>
            <div className="d-flex gap-2 mt-3">
              <button
                className="btn small-rounded-button btn-sm px-3"
                onClick={() => navigate('/dashboard/addbalance')}
              >
                Get Payment
              </button>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="border rounded p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Revenue</h6>
              <select className="form-select form-select-sm w-auto">
                <option>Today</option>
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <h4>₹0.00</h4>
            <button
              className="btn btn-outline-primary btn-sm mt-2 px-3 shadow-button"
              onClick={() => navigate('/dashboard/reports/transactionhistory')}
            >
              Go to History
            </button>
          </div>
        </div>

        <div className="col">
          <div className="border rounded p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Settlements</h6>
              <select className="form-select form-select-sm w-auto">
                <option>Today</option>
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <h4>₹0.00</h4>
            <button
              className="btn btn-outline-primary btn-sm mt-2 px-3 shadow-button"
              onClick={() => navigate('/dashboard/banktransfer')}
            >
              Settle Now
            </button>
          </div>
        </div>
      </div>

      {/* Bill Services */}
      <div className="border rounded p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">Bill Services</h6>
          <button className="btn btn-outline-secondary btn-sm">Customize Services</button>
        </div>
        <div className="d-flex gap-3 flex-wrap justify-content-start">
          <button className="btn btn-outline-primary service-button" onClick={() => navigate('/dashboard/reports/comingsoon')}>
            <img src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/Broadband.png" alt="Wifi" className="service-icon-viewmore" />
          </button>
          <button className="btn btn-outline-primary service-button" onClick={() => navigate('/dashboard/reports/payments')}>
            <img src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/gas_cylinder.png" alt="CC Payments" className="service-icon-viewmore" />
            Credit Card
          </button>
          <button className="btn btn-outline-primary service-button" onClick={() => navigate('/dashboard/reports/comingsoon')}>
            <img src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/dth.png" alt="Recharge" className="service-icon-viewmore" />
            Recharge
          </button>
          <button className="btn btn-outline-primary service-button" onClick={() => navigate('/dashboard/reports/comingsoon')}>
            <img src="https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/credit_card.png" alt="View More" className="service-icon-viewmore" />
            View more
          </button>
        </div>
      </div>

      {/* Transaction Trends */}
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

      {/* ✅ Fixed Footer */}
      <div className="retailer-footer">
        All rights reserved © 2025 NeoFin Nex India Pvt Ltd
      </div>
    </div>
  );
}
