import React from 'react';

const LeaseForm = ({ values, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...values,
      [field]: parseFloat(value) || 0
    });
  };

  return (
    <div className="form-section">
      <h3><i className="lni lni-handshake"></i> Lease Details</h3>
      
      <div className="form-group">
        <label htmlFor="lease-monthly">Monthly Payment ($)</label>
        <input
          id="lease-monthly"
          type="number"
          value={values.monthlyPayment}
          onChange={(e) => handleChange('monthlyPayment', e.target.value)}
          min="0"
          step="10"
        />
      </div>

      <div className="form-group">
        <label htmlFor="lease-down">Down Payment ($)</label>
        <input
          id="lease-down"
          type="number"
          value={values.downPayment}
          onChange={(e) => handleChange('downPayment', e.target.value)}
          min="0"
          step="100"
        />
      </div>

      <div className="form-group">
        <label htmlFor="lease-term">Lease Term (Years)</label>
        <input
          id="lease-term"
          type="number"
          value={values.termYears}
          onChange={(e) => handleChange('termYears', e.target.value)}
          min="1"
          max="5"
          step="1"
        />
      </div>

      <div className="form-group">
        <label htmlFor="lease-mileage">Annual Mileage Limit</label>
        <input
          id="lease-mileage"
          type="number"
          value={values.mileageLimit}
          onChange={(e) => handleChange('mileageLimit', e.target.value)}
          min="5000"
          max="25000"
          step="1000"
        />
      </div>
    </div>
  );
};

export default LeaseForm;