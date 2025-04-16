import React, { useState } from 'react';
import { Input, Button, Tag, Typography, Row, Col, Card } from 'antd';
import "../styles/AddBalance.css";

const { Title, Paragraph } = Typography;

export default function AddBalance() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const [enteredAmount, setEnteredAmount] = useState('');
  const [referenceAmounts, setReferenceAmounts] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [highlightPlanButtons, setHighlightPlanButtons] = useState(false);
  const [selectedPlanButton, setSelectedPlanButton] = useState('');

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

    // Don't reset the amount when changing plans
  };

  const handleInputChange = (e) => {
    const amount = parseInt(e.target.value);
    setEnteredAmount(e.target.value);
    if (amount) {
      setReferenceAmounts([amount - 1, amount - 2, amount + 1, amount + 2]);
    } else {
      setReferenceAmounts([]);
    }
    setSelectedAmount(null); // Clear the selected amount when changing the input
  };

  const handleReferenceClick = (val) => {
    setSelectedAmount(val);
  };

  const handleAddBalance = () => {
    if (!selectedPlan) {
      setHighlightPlanButtons(true);
      return;
    }
    console.log('Adding balance:', selectedAmount);
  };

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
