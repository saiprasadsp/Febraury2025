import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BillPayments.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BillPayments() {
  const navigate = useNavigate();

  const billServices = [
    { name: "WiFi", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/wifi.png", path: "/dashboard/bill/wifi" },
    { name: "Broadband", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/Broadband.png", path: "/dashboard/bill/broadband" },
    { name: "Credit Card", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/credit_card.png", path: "/dashboard/reports/payments" },
    { name: "DTH", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/dth.png", path: "/dashboard/bill/dth" },
    { name: "Electricity", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/electricity_bill.png", path: "/dashboard/bill/electricity" },
    { name: "Gas", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/gas_cylinder.png", path: "/dashboard/bill/gas" },
    { name: "Mobile Recharge", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/mobile_recharge.png", path: "/dashboard/bill/mobile" },
    { name: "POS Machine", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/POS_Mechine.png", path: "/dashboard/bill/pos" },
    { name: "QR Code", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/QR+code.png", path: "/dashboard/bill/qr" },
    { name: "Revenue", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/revenue.png", path: "/dashboard/bill/revenue" },
    { name: "Settlements", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/settlements.png", path: "/dashboard/bill/settlements" },
    { name: "Wallet", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/wallet.png", path: "/dashboard/bill/wallet" },
  ];

  return (
    <div className="bill-payment-container container mt-4">
      <h4 className="mb-3">Bill Payments</h4>

      <div className="big-box p-4 rounded shadow-sm">
        <div className="icon-grid">
          {billServices.map((service, index) => (
            <div
              key={index}
              className="icon-box text-center"
              onClick={() => navigate(service.path)}
              style={{ cursor: 'pointer' }}
            >
              <img src={service.url} alt={service.name} className="bill-icon" />
              <div className="icon-label">{service.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
