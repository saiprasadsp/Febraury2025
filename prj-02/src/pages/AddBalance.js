import React, { useEffect, useState } from 'react';
import { Input, Button, Tag, Typography, Row, Col, Card } from 'antd';
import "../styles/AddBalance.css";
import { load } from "@cashfreepayments/cashfree-js";
import { useCreateOrderMutation,useCreateRazorOrderMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const { Title, Paragraph } = Typography;


const formattedDate =(value)=>{
  const date = new Date(value)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const randomSixDigit = Math.floor(100000 + Math.random() * 900000); 

  return `TheQuickPay_${year}_${month}_${day}_${randomSixDigit}`;
}

export default function AddBalance() {
  const {userInfo} = useSelector((state)=>state.auth)
  const [selectedPlan, setSelectedPlan] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const [enteredAmount, setEnteredAmount] = useState('');
  const [referenceAmounts, setReferenceAmounts] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [highlightPlanButtons, setHighlightPlanButtons] = useState(false);
  const [selectedPlanButton, setSelectedPlanButton] = useState('');
  const [createOrder]= useCreateOrderMutation()
  const [createRazorOrder] = useCreateRazorOrderMutation()
  
  let cashfree;
    var initializeSDK = async function () {          
        cashfree = await load({
            mode: "sandbox"
        });
    }
    initializeSDK();

    useEffect(()=>{
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

    },[])
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setSelectedPlanButton(plan);
    setHighlightPlanButtons(false);

    switch (plan) {
      case 'Basic':
        setInfoMsg('Works for normal cards - 1.25%');
        setIsError(false);
        break;
      case 'Standard':
        setInfoMsg('Works for all cards except HDFC - 1.65%');
        setIsError(false);
        break;
      case 'Premium':
        setInfoMsg('Works for all cards including HDFC - 1.7%');
        setIsError(true);
        break;
      default:
        setInfoMsg('');
        setIsError(false);
    }

  };

  const handleInputChange = (e) => {
    const amount = parseInt(e.target.value);
    setEnteredAmount(e.target.value);
    if (amount) {
      setReferenceAmounts([amount - 1, amount - 2, amount + 1, amount + 2]);
    } else {
      setReferenceAmounts([]);
    }
    setSelectedAmount(null); 
  };

  const handleReferenceClick = (val) => {
    
    setSelectedAmount(val);

  };

    const handleAddBalance = async() => {

      if (!selectedPlan) {
        setHighlightPlanButtons(true);
        return;
      }
      if (selectedPlan === 'Basic') {
        try {
          const res = await createOrder({amount:selectedAmount,phone:userInfo.phone,customerID:userInfo.id,orderID:formattedDate(new Date())}).unwrap()
          
          let checkoutOptions={
            paymentSessionId:res.Session_ID,
            redirectTarget:'_self'
          }
          
          cashfree.checkout(checkoutOptions)
          
        } catch (err) {
          toast.error(err?.data?.message || "Failed to update status");
          
        }
        
      }else if(selectedPlan==='Standard'){
        
        try {
          const {data} = await createRazorOrder({amount:selectedAmount,phone:userInfo.phone,customerID:userInfo.id})
        
        const options = {
            key:process.env.REACT_APP_RAZOR_PAY,
            amount:data.amount,
            currency:data.currency,
            name:'Quick Pay',
            description:"Please make the payment",
            image:'',
            order_id:data.orderid,
            callback_url:process.env.REACT_APP_CALL_BACK_URL,
            handler:function (response) {
              console.log("step 10",response);
              
                // window.location.href=""
            },
            prefill:{
                name:userInfo.id,
                email:userInfo.email,
                contact:userInfo.phone,
    
            },
            theme:{
                color:'#3399cc'
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
        } catch (err) {
          console.log(err);
          toast.error(err?.data?.message || "Failed to update status")
        }
      }else{
      console.log("Step 3",selectedPlan);
      
      }
      

    };
  

  // const doPayment = async()=>{
  //   let checkoutOptions={
  //     paymentSessionId:"",
  //     redirectTarget:'_self'
  //   }
  //   cashfree.checkout(checkoutOptions)
  // }
  return (
    <Row justify="center" style={{ marginTop: '30px' }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card className="inner-card">
          <Title level={4}>Add Balance</Title>

          <div className="plan-buttons">
            <Button
              className={`plan-button ${highlightPlanButtons && !selectedPlan ? 'highlight' : ''} 
                          ${selectedPlanButton === 'Basic' ? 'selected' : ''}`}
              onClick={() => handlePlanSelect('Basic')}
            >
              Basic
            </Button>
            <Button
              className={`plan-button ${highlightPlanButtons && !selectedPlan ? 'highlight' : ''} 
                          ${selectedPlanButton === 'Standard' ? 'selected' : ''}`}
              onClick={() => handlePlanSelect('Standard')}
            >
              Standard
            </Button>
            <Button
              className={`plan-button ${highlightPlanButtons && !selectedPlan ? 'highlight' : ''} 
                          ${selectedPlanButton === 'Premium' ? 'selected' : ''}`}
              onClick={() => handlePlanSelect('Premium')}
            >
              Premium
            </Button>
          </div>

          {selectedPlan && (
            <Paragraph className="plan-message" type={isError ? 'danger' : 'secondary'}>
              {infoMsg}
            </Paragraph>
          )}

          <Input
            type="number"
            className="amount-input"
            placeholder="Enter amount"
            value={enteredAmount}
            onChange={handleInputChange}
          />

          {referenceAmounts.length > 0 && (
            <div className="reference-tags">
              {referenceAmounts.map((val) => (
                <Tag
                  color={selectedAmount === val ? 'red' : 'default'}
                  key={val}
                  onClick={() => handleReferenceClick(val)}
                  style={{ cursor: 'pointer' }}
                >
                  ₹{val}
                </Tag>
              ))}
            </div>
          )}

          <Button
            type="primary"
            className="add-balance-button"
            disabled={!selectedAmount}
            onClick={handleAddBalance}
          >
            Add Balance
          </Button>
        </Card>
      </Col>
    </Row>
  );
}
