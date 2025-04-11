import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaRupeeSign, FaMoneyCheckAlt, FaWallet, FaCreditCard, FaUsers, FaUserTie, FaExchangeAlt, FaClock } from 'react-icons/fa';
import { useDashboardMutation } from "../slices/usersApiSlice";
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const redirectTo={
  distributor:'/dashboard/distributor',
  retailer:'/dashboard/retailer'
}
export default function Content() {
  const {userInfo} = useSelector((state)=>state.auth)
  const [list,setList] = useState({
    total_distributor:0,
    total_retailer:0,
    total_pending:0
  })
const [dashboard] = useDashboardMutation()
const navigate = useNavigate()
  useEffect(()=>{
    const fetchDashboard = async () => {
      try {
        const res= await dashboard().unwrap()
        if (res && res.length>0) {
        setList(res[0])
        }
        
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error)
      }
    }
    fetchDashboard()
  },[])
  const data = [
    { name: "AVAILABLE BALANCE", icon: <FaWallet /> },
    { name: "PAYIN IN", icon: <FaRupeeSign /> },
    { name: "PAYOUT", icon: <FaMoneyCheckAlt /> },
    { name: "CC Bill Payments", icon: <FaCreditCard /> },
    // (userInfo.role !=="retailer" ?{ name: "Distributor List", icon: <FaUserTie />,count:`${list.total_distributor}` ,value:'distributor'}:[]),
    { name: "Retail List", icon: <FaUsers />,count:`${list.total_retailer}`,value:'retailer' },
    { name: "Today Transactions", icon: <FaExchangeAlt /> },
    { name: "KYC Pending", icon: <FaClock />,count:`${list.total_pending}` },
  ];
const handleRedirect=(value)=>{
  if (redirectTo[value]) {
    navigate(redirectTo[value])
  }

}
  return (
    <Container className="d-flex flex-wrap justify-content-center gap-4" fluid>
      {data.map((item, index) => (
        <div key={index} className="dashboard-box">
          <div>
          {item.icon} <span>{item.name}</span>
          </div>
          <div>
            <span>{item.count}</span>
            <span>{item.count ? <><Button onClick={()=>handleRedirect(item.value)}>View</Button></>:<></>}</span>
          </div>
        </div>
      ))}
    </Container>
  );
}
