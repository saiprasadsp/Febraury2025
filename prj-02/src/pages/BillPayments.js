import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BillPayments.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BillPayments() {
  const navigate = useNavigate();

  const billServices = [
    { name: "Fast Tag", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/Fast+Tag.png", path: "/dashboard/bill/fasttag" },
    { name: "WiFi", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/wifi.png", path: "/dashboard/bill/wifi" },
    { name: "Broadband", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/Broadband.jpeg", path: "/dashboard/bill/broadband" },
    { name: "Credit Card", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/Credit_Card.png", path: "/dashboard/reports/comingsoon" },
    { name: "DTH", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/DTH.png", path: "/dashboard/bill/dth" },
    { name: "Electricity", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/Electricity_Bill.png", path: "/dashboard/bill/electricity" },
    { name: "Gas", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/Cylinder.png", path: "/dashboard/bill/gas" },
    { name: "Mobile Recharge", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/Recharge.png", path: "/dashboard/bill/mobile" },
    { name: "POS Machine", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/POS_Machine.png", path: "/dashboard/bill/pos" },
    { name: "QR Code", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/QRCode.png", path: "/dashboard/bill/qr" }, 
    { name: "Insurance", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/Insurance.png", path: "/dashboard/bill/fasttag" },
    { name: "Loan EMI", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/Loan+EMI.png", path: "/dashboard/bill/fasttag" },
    { name: "Subscription", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/subscriptionns.png", path: "/dashboard/bill/fasttag" },
    { name: "Tax Payments", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/Tax.png", path: "/dashboard/bill/fasttag" },
    { name: "Vendor Payments", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/vendor+payments.png", path: "/dashboard/bill/fasttag" },
    { name: "Water Bill", url: "https://announcementsgenysoft.s3.ap-south-1.amazonaws.com/thequcikpaymeicons/water.png", path: "/dashboard/bill/fasttag" },
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
