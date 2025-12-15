import React, { useEffect, useState } from 'react';
import { Input, Button, Tag, Typography, Row, Col, Card } from 'antd';
import "../styles/AddBalance.css";
import { load } from "@cashfreepayments/cashfree-js";
import { useCreateOrderMutation, useCreateRazorOrderMutation,usePhonepeMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const formattedDate = (value) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const randomSixDigit = Math.floor(100000 + Math.random() * 900000);

  return `TheQuickPay_${year}_${month}_${day}_${randomSixDigit}`;
};

export default function AddBalance() {
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedPlan, setSelectedPlan] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const [enteredAmount, setEnteredAmount] = useState('');
  const [invoice, setInvoice] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const [referenceAmounts, setReferenceAmounts] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [highlightPlanButtons, setHighlightPlanButtons] = useState(false);
  const [selectedPlanButton, setSelectedPlanButton] = useState('');

  const [createOrder] = useCreateOrderMutation();
  const [createRazorOrder] = useCreateRazorOrderMutation();
  const [phonepe] = usePhonepeMutation()

  let cashfree;

  const initializeSDK = async () => {
    cashfree = await load({ mode: "sandbox" });
  };
  initializeSDK();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setSelectedPlanButton(plan);
    setHighlightPlanButtons(false);

    switch (plan) {
      case 'Basic':
        setIsError(false);
        break;
      case 'Standard':
        setIsError(false);
        break;
      case 'Premium':
        setIsError(false);
        break;
      default:
        setInfoMsg('');
        setIsError(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'invoice':
        setInvoice(value);
        break;
      case 'customerName':
        setCustomerName(value);
        break;
      case 'mobileNumber':
        setMobileNumber(value);
        break;
      case 'amount':
        setEnteredAmount(value);
        const amount = parseInt(value);
        if (amount) {
          setReferenceAmounts([amount]);
        } else {
          setReferenceAmounts([]);
        }
        setSelectedAmount(null);
        break;
      default:
        break;
    }
  };

  const handleReferenceClick = (val) => {
    setSelectedAmount(val);
  };

  const handleAddBalance = async () => {
    if (!selectedPlan) {
      setHighlightPlanButtons(true);
      return;
    }

    if (selectedPlan === 'Basic') {
      try {
        const res = await createOrder({
          amount: selectedAmount,
          phone: userInfo.phone,
          customerID: userInfo.id,
          Invoice: invoice,
          CustomerName: customerName,
          charges: process.env.REACT_APP_INCOME,
          orderID: formattedDate(new Date()),
        }).unwrap();

        const checkoutOptions = {
          paymentSessionId: res.Session_ID,
          redirectTarget: '_self',
        };

        cashfree.checkout(checkoutOptions);
      } catch (err) {
        toast.error(err?.data?.message || "Failed to update status");
      }

    } else if (selectedPlan === 'Standard') {
      console.log("step 1");

      try {
        const { data } = await createRazorOrder({
          amount: selectedAmount,
          CustomerName: customerName,
          Invoice: invoice,
          phone: mobileNumber,
          customerID: userInfo.id,
          charges: process.env.REACT_APP_INCOME,
        });

        const options = {
          key: process.env.REACT_APP_RAZOR_PAY,
          amount: data.amount,
          currency: data.currency,
          name: 'Quick Pay',
          description: "Please make the payment",
          order_id: data.orderid,
          // redirect:true,
          // callback_url: process.env.REACT_APP_CALL_BACK_URL,
          handler: function (response) {
            console.log("Razorpay response:", response);
            window.location.href = `/dashboard/payment-status?order_id=${data.orderid}&provider=razorpay`
          },
          prefill: {
            name: userInfo.id,
            email: userInfo.email,
            contact: userInfo.phone,
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        toast.error(err?.data?.message || "Failed to update status");
      }
    }
    else if (selectedPlan === 'Premium') {
      try {
        const {data} = await phonepe({paisa:selectedAmount,
          CustomerName: customerName,
          Invoice: invoice,
          phone: mobileNumber,
          customerID: userInfo.id,
          charges: process.env.REACT_APP_INCOME,})
        console.log(data);
        const redirectUrl = data.url
        const orderId = data.orderId

        if (!redirectUrl|| !orderId) {
          toast.error("Invalid Phonpe response")
          return
        }

        window.open(redirectUrl,"_blank","noopener,noreferrer")
        // window.location.href=`/dashboard/payment-status?order_id=${orderId}&provider=phonepe`

      } catch (err) {
        toast.error(err?.data?.messsage||"Failed to update status")
      }

    }
  };

  const handleData = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'invoice':
        setInvoice(value)
        break;
      case 'customerName':
        setCustomerName(value)
        break;
      case 'mobileNumber':
        setMobileNumber(value)
        break;

      default:
        break;
    }


  }

  return (
    <Row justify="center" style={{ marginTop: '30px' }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card className="inner-card">
          <Title level={4}> Get Payment</Title>

          <div className="plan-buttons">
            <Button
              className={`plan-button
    ${highlightPlanButtons && !selectedPlan ? 'highlight' : ''}
    ${selectedPlanButton === 'Standard' ? 'selected' : ''}`}
              onClick={() => handlePlanSelect('Standard')}
            >
              Razorpay
            </Button>
            <Button
            className={`plan-button
    ${highlightPlanButtons && !selectedPlan ? 'highlight' : ''}
    ${selectedPlanButton === 'Premium' ? 'selected' : ''}`}
            onClick={()=>handlePlanSelect('Premium')}
            >
              Phone-pe
            </Button>

          </div>

          {selectedPlan && (
            <Paragraph className="plan-message" type={isError ? 'danger' : 'secondary'}>
              {infoMsg}
            </Paragraph>
          )}

          {/* Form Fields */}
          <div className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="invoice">Email</label>
                <input
                  type="text"
                  name="invoice"
                  placeholder="Email"
                  onChange={handleData}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerName">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  placeholder="Customer Name"
                  onChange={handleData}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  onChange={handleData}
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  value={enteredAmount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Reference Tags */}
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

          {/* Submit Button */}
          <Button
            type="primary"
            className="add-balance-button"
            disabled={!selectedAmount}
            onClick={handleAddBalance}
          >
            Get Payment
          </Button>
        </Card>
      </Col>
    </Row>
  );
}
