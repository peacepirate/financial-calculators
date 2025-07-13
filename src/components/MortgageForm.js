import React from 'react';

const MortgageForm = ({ values, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...values,
      [field]: parseFloat(value) || 0
    });
  };

  return (
    <div className="form-section">
      <h3><i className="lni lni-credit-cards"></i> Mortgage Details</h3>
      
      <div className="form-group">
        <label htmlFor="mortgage-down">Down Payment ($)</label>
        <input
          id="mortgage-down"
          type="number"
          value={values.downPayment}
          onChange={(e) => handleChange('downPayment', e.target.value)}
          min="0"
          step="1000"
        />
      </div>

      <div className="form-group">
        <label htmlFor="mortgage-rate">Interest Rate (%)</label>
        <input
          id="mortgage-rate"
          type="number"
          value={values.interestRate}
          onChange={(e) => handleChange('interestRate', e.target.value)}
          min="0"
          max="15"
          step="0.1"
        />
      </div>

      <div className="form-group">
        <label htmlFor="mortgage-term">Mortgage Term (Years)</label>
        <input
          id="mortgage-term"
          type="number"
          value={values.termYears}
          onChange={(e) => handleChange('termYears', e.target.value)}
          min="10"
          max="30"
          step="5"
        />
      </div>

      <div className="form-group">
        <label htmlFor="closing-costs">Closing Costs ($)</label>
        <input
          id="closing-costs"
          type="number"
          value={values.closingCosts}
          onChange={(e) => handleChange('closingCosts', e.target.value)}
          min="0"
          step="500"
        />
      </div>
    </div>
  );
};

export default MortgageForm;