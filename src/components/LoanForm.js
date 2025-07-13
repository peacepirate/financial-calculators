import React from 'react';

const LoanForm = ({ values, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...values,
      [field]: parseFloat(value) || 0
    });
  };

  return (
    <div className="form-section">
      <h3><i className="lni lni-credit-cards"></i> Loan Details</h3>
      
      <div className="form-group">
        <label htmlFor="loan-down">Down Payment ($)</label>
        <input
          id="loan-down"
          type="number"
          value={values.downPayment}
          onChange={(e) => handleChange('downPayment', e.target.value)}
          min="0"
          step="100"
        />
      </div>

      <div className="form-group">
        <label htmlFor="loan-rate">Interest Rate (%)</label>
        <input
          id="loan-rate"
          type="number"
          value={values.interestRate}
          onChange={(e) => handleChange('interestRate', e.target.value)}
          min="0"
          max="30"
          step="0.1"
        />
      </div>

      <div className="form-group">
        <label htmlFor="loan-term">Loan Term (Years)</label>
        <input
          id="loan-term"
          type="number"
          value={values.termYears}
          onChange={(e) => handleChange('termYears', e.target.value)}
          min="1"
          max="10"
          step="1"
        />
      </div>
    </div>
  );
};

export default LoanForm;