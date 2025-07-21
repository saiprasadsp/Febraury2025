import React, { useState,useEffect,useRef } from 'react'
import { Result,Spin } from "antd";
import { useLocation } from "react-router-dom";
import { useOrderStatusMutation } from "../slices/usersApiSlice";
import Spinner from '../Components/Spinner';
import { useSelector } from 'react-redux';
export default function PaymentStatus() {
    const location = useLocation()
    const [status,setStatus] = useState("loading")
    const [message,setMessage] = useState("")
    const [orderStatus] = useOrderStatusMutation()
    const {userInfo} = useSelector((state)=>state.auth)
    const calledRef = useRef(false)
    useEffect(()=>{
      if (calledRef.current) return;
      calledRef.current=true

        const query = new URLSearchParams(location.search)
        const orderId = query.get("order_id")

        if (!orderId) {
          setStatus('failed')
          setMessage('Missing order ID in the URL')
          return
        }

        const checkStatus=async () => {
          try {
            const response = await orderStatus({orderID:orderId,customerID:userInfo.id,charges:process.env.REACT_APP_INCOME})
            const orderArray = response.data.order_status
            if (!Array.isArray(orderArray)|| orderArray.length===0) {
              setStatus('failed')
              setMessage("No payment found for this order. It may have failed or not been processed")
              return
            }
            const {payment_status} = orderArray[0]

            if (payment_status === 'SUCCESS') {
              setStatus('success')
              setMessage('Payment completed Successfully')
            } else if (payment_status==='PENDING') {
              setStatus('pending')
              setMessage('Payment is in pending')
            }else{
              setStatus('failed')
              setMessage('Payment Failed ')
            }
          } catch (err) {
            console.log(err);
            setStatus('failed')
            setMessage(err)
          }
        }
        checkStatus()
    },[location.search])
    if (status === 'loading') {
      return <Spinner/>
    }
  return (
    <Result
      status={status === "success" ? "success" : "error"}
      title={status === "success" ? "Payment Successful" : "Payment Failed"}
      subTitle={message}
    />
  )
}
