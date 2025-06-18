import React from 'react'

export default function RetailerDashboard() {
  return (
    <div className="container py-3">
      <div className="mb-4">
        <h4>Hello, <strong>M09876</strong> 👋</h4>
        <small className="text-muted">What bill will you be paying today?</small>
      </div>

      {/* Wallet + Stats */}
      <div className="row g-3 mb-3">
        <div className="col">
          <div className="bg-primary text-white rounded p-3 h-100">
            <h6>Wallet Balance</h6>
            <h4>₹0.00</h4>
            <div className="d-flex gap-2">
              <button className="btn btn-light btn-sm px-4 rounded-pill">Add Money</button>
              <button className="btn btn-light btn-sm px-4 rounded-pill">Withdraw</button>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="border rounded p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Total Savings</h6>
              <select className="form-select form-select-sm w-auto">
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <h4>₹0.00</h4>
          </div>
        </div>

        <div className="col">
          <div className="border rounded p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Money Out</h6>
              <select className="form-select form-select-sm w-auto">
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <h4>₹0.00</h4>
          </div>
        </div>
      </div>

      {/* Bill Services */}
      <div className="border rounded p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">Bill Services</h6>
          <button className="btn btn-outline-secondary btn-sm">Customize Services</button>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          {['Balance', 'Bill Payments', 'CC Payments', 'Recharge', 'View more'].map((label, idx) => (
            <button key={idx} className="btn btn-outline-primary btn-sm">
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction Trends */}
      <div className="border rounded p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">Transaction Trends</h6>
          <div className="d-flex gap-2">
            <select className="form-select form-select-sm w-auto">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
            <button className="btn btn-outline-primary btn-sm">Export</button>
          </div>
        </div>

        <table className="table table-bordered table-sm text-center">
          <thead className="table-light">
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
    </div>

  )
}
