import React from 'react';

const PropertyForm = ({ values, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...values,
      [field]: parseFloat(value) || 0
    });
  };

  return (
    <div className="form-section">
      <h3><i className="lni lni-home"></i> Property Information</h3>
      
      <div className="form-group">
        <label htmlFor="property-price">Property Price ($)</label>
        <input
          id="property-price"
          type="number"
          value={values.price}
          onChange={(e) => handleChange('price', e.target.value)}
          min="0"
          step="5000"
        />
      </div>

      <div className="form-group">
        <label htmlFor="appreciation-rate">Annual Appreciation Rate (%)</label>
        <input
          id="appreciation-rate"
          type="number"
          value={values.appreciationRate}
          onChange={(e) => handleChange('appreciationRate', e.target.value)}
          min="0"
          max="15"
          step="0.1"
        />
      </div>

      <div className="form-group">
        <label htmlFor="property-tax">Annual Property Tax ($)</label>
        <input
          id="property-tax"
          type="number"
          value={values.propertyTax}
          onChange={(e) => handleChange('propertyTax', e.target.value)}
          min="0"
          step="100"
        />
      </div>

      <div className="form-group">
        <label htmlFor="maintenance-cost">Annual Maintenance Cost ($)</label>
        <input
          id="maintenance-cost"
          type="number"
          value={values.maintenanceCost}
          onChange={(e) => handleChange('maintenanceCost', e.target.value)}
          min="0"
          step="100"
        />
      </div>

      <div className="form-group">
        <label htmlFor="comparison-years">Comparison Period (Years)</label>
        <input
          id="comparison-years"
          type="number"
          value={values.comparisonYears}
          onChange={(e) => handleChange('comparisonYears', e.target.value)}
          min="5"
          max="30"
          step="1"
        />
      </div>
    </div>
  );
};

export default PropertyForm;