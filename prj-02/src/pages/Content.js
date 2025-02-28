import React from 'react';
import { Container } from 'react-bootstrap';
import { FaRupeeSign, FaMoneyCheckAlt, FaWallet, FaCreditCard, FaUsers, FaUserTie, FaExchangeAlt, FaClock } from 'react-icons/fa'; // Import icons

export default function Content() {
  const data = [
    { name: "AVAILABLE BALANCE", icon: <FaWallet /> },
    { name: "PAYIN IN", icon: <FaRupeeSign /> },
    { name: "PAYOUT", icon: <FaMoneyCheckAlt /> },
    { name: "CC Bill Payments", icon: <FaCreditCard /> },
    { name: "Distributor List", icon: <FaUserTie /> },
    { name: "Retail List", icon: <FaUsers /> },
    { name: "Today Transactions", icon: <FaExchangeAlt /> },
    { name: "KYC Pending", icon: <FaClock /> },
  ];

  return (
    <Container className="d-flex flex-wrap justify-content-center gap-4" fluid>
      {data.map((item, index) => (
        <div key={index} className="dashboard-box">
          {item.icon} <span>{item.name}</span>
        </div>
      ))}
    </Container>
  );
}
