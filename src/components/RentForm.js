import React from 'react';

const RentForm = ({ values, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...values,
      [field]: parseFloat(value) || 0
    });
  };

  return (
    <div className="form-section">
      <h3><i className="lni lni-handshake"></i> Rent Details</h3>
      
      <div className="form-group">
        <label htmlFor="monthly-rent">Monthly Rent ($)</label>
        <input
          id="monthly-rent"
          type="number"
          value={values.monthlyRent}
          onChange={(e) => handleChange('monthlyRent', e.target.value)}
          min="0"
          step="50"
        />
      </div>

      <div className="form-group">
        <label htmlFor="security-deposit">Security Deposit ($)</label>
        <input
          id="security-deposit"
          type="number"
          value={values.securityDeposit}
          onChange={(e) => handleChange('securityDeposit', e.target.value)}
          min="0"
          step="100"
        />
      </div>

      <div className="form-group">
        <label htmlFor="rent-increase">Annual Rent Increase (%)</label>
        <input
          id="rent-increase"
          type="number"
          value={values.rentIncrease}
          onChange={(e) => handleChange('rentIncrease', e.target.value)}
          min="0"
          max="10"
          step="0.1"
        />
      </div>

      <div className="form-group">
        <label htmlFor="renter-insurance">Annual Renter's Insurance ($)</label>
        <input
          id="renter-insurance"
          type="number"
          value={values.rentersInsurance}
          onChange={(e) => handleChange('rentersInsurance', e.target.value)}
          min="0"
          step="50"
        />
      </div>
    </div>
  );
};

export default RentForm;