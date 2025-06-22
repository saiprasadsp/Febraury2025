import '../styles/AddCreditCard.css';
import React, { useState } from 'react';
import Select from 'react-select';

export default function AddCreditCard() {
  const bankOptions = [
    { value: 'HDFC', label: 'HDFC' },
    { value: 'ICICI', label: 'ICICI' },
    { value: 'SBI', label: 'SBI' },
    { value: 'Axis', label: 'Axis' },
    { value: 'Kotak', label: 'Kotak' },
    { value: 'Yes Bank', label: 'Yes Bank' },
    { value: 'IDFC First', label: 'IDFC First' }
  ];

  const [selectedBank, setSelectedBank] = useState(null);
  const [cardDigits, setCardDigits] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [errors, setErrors] = useState({});

  const handleCardDigitsChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    if (value.length <= 4) {
      setCardDigits(value);
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setMobileNumber(value);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!selectedBank) newErrors.bank = 'Please select a bank';
    if (cardDigits.length !== 4) newErrors.cardDigits = 'Enter 4 digits';
    if (mobileNumber.length !== 10) newErrors.mobileNumber = 'Enter 10 digit mobile number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Submit your logic here
      console.log('Submitted:', { selectedBank, cardDigits, mobileNumber });
    }
  };

  return (
    <div className="add-credit-card-container">
      <h4>Add Credit Card</h4>

      <div className="mb-3">
        <label className="form-label">Select Bank</label>
        <Select
          options={bankOptions}
          value={selectedBank}
          onChange={setSelectedBank}
          placeholder="Search & select bank..."
          className={errors.bank ? 'is-invalid' : ''}
        />
        {errors.bank && <div className="invalid-feedback d-block">{errors.bank}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Last 4 digits of card</label>
        <input
          type="text"
          className={`form-control ${errors.cardDigits ? 'is-invalid' : ''}`}
          placeholder="1234"
          value={cardDigits}
          onChange={handleCardDigitsChange}
        />
        {errors.cardDigits && <div className="invalid-feedback">{errors.cardDigits}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Registered Mobile Number</label>
        <input
          type="text"
          className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
          placeholder="Enter mobile number"
          value={mobileNumber}
          onChange={handleMobileChange}
        />
        {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
      </div>

      <div className="text-center">
        <button className="btn btn-primary centered-block-button" onClick={handleSubmit}>
          Fetch Bill
        </button>
      </div>
    </div>
  );
}
