import React from 'react';

const VehicleForm = ({ values, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...values,
      [field]: parseFloat(value) || 0
    });
  };

  return (
    <div className="form-section">
      <h3>Vehicle Information</h3>
      
      <div className="form-group">
        <label htmlFor="vehicle-price">Vehicle Price ($)</label>
        <input
          id="vehicle-price"
          type="number"
          value={values.price}
          onChange={(e) => handleChange('price', e.target.value)}
          min="0"
          step="500"
        />
      </div>

      <div className="form-group">
        <label htmlFor="depreciation-rate">Annual Depreciation Rate (%)</label>
        <input
          id="depreciation-rate"
          type="number"
          value={values.depreciationRate}
          onChange={(e) => handleChange('depreciationRate', e.target.value)}
          min="5"
          max="30"
          step="1"
        />
      </div>

      <div className="form-group">
        <label htmlFor="comparison-years">Comparison Period (Years)</label>
        <input
          id="comparison-years"
          type="number"
          value={values.comparisonYears}
          onChange={(e) => handleChange('comparisonYears', e.target.value)}
          min="3"
          max="15"
          step="1"
        />
      </div>
    </div>
  );
};

export default VehicleForm;