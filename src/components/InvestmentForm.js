import React from 'react';

const InvestmentForm = ({ values, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...values,
      [field]: parseFloat(value) || 0
    });
  };

  return (
    <div className="form-section">
      <h3><i className="lni lni-investment"></i> Investment Alternative</h3>
      
      <div className="form-group">
        <label htmlFor="investment-return">Annual Investment Return (%)</label>
        <input
          id="investment-return"
          type="number"
          value={values.annualReturn}
          onChange={(e) => handleChange('annualReturn', e.target.value)}
          min="0"
          max="20"
          step="0.1"
        />
      </div>

      <div className="form-group">
        <label htmlFor="monthly-investment">Additional Monthly Investment ($)</label>
        <input
          id="monthly-investment"
          type="number"
          value={values.monthlyInvestment}
          onChange={(e) => handleChange('monthlyInvestment', e.target.value)}
          min="0"
          step="50"
        />
      </div>

      <div className="form-group">
        <label htmlFor="savings-investment-rate">Savings Investment Rate (%)</label>
        <input
          id="savings-investment-rate"
          type="number"
          value={values.savingsInvestmentRate}
          onChange={(e) => handleChange('savingsInvestmentRate', e.target.value)}
          min="0"
          max="100"
          step="5"
        />
        <small style={{color: '#b2bec3', fontSize: '0.9rem', display: 'block', marginTop: '4px'}}>
          Percentage of monthly savings to invest when buying is cheaper
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="investment-fees">Annual Investment Fees (%)</label>
        <input
          id="investment-fees"
          type="number"
          value={values.annualFees}
          onChange={(e) => handleChange('annualFees', e.target.value)}
          min="0"
          max="5"
          step="0.01"
        />
      </div>
    </div>
  );
};

export default InvestmentForm;