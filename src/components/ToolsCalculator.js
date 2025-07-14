import React, { useState } from 'react';
import CostChart from './CostChart';
import Recommendation from './Recommendation';
import Summary from './Summary';

const ToolsCalculator = () => {
  const [toolData, setToolData] = useState({
    toolName: 'Lawn Mower',
    purchasePrice: 500,
    dailyRentalRate: 25,
    weeklyRentalRate: 100,
    monthlyRentalRate: 300,
    usageDaysPerMonth: 2,
    monthlyMaintenanceCost: 4,
    resaleValuePercentage: 30,
    comparisonMonths: 36
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setToolData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const calculateToolCosts = () => {
    const {
      purchasePrice,
      dailyRentalRate,
      weeklyRentalRate,
      monthlyRentalRate,
      usageDaysPerMonth,
      monthlyMaintenanceCost,
      resaleValuePercentage,
      comparisonMonths
    } = toolData;

    const comparison = [];
    
    // Calculate which rental rate to use based on usage patterns
    const getRentalCostPerMonth = () => {
      const daysPerMonth = usageDaysPerMonth;
      
      // If used less than 2 days per month, use daily rate
      if (daysPerMonth <= 2) {
        return daysPerMonth * dailyRentalRate;
      }
      // If used less than 1 week per month, use weekly rate
      else if (daysPerMonth <= 7) {
        const weeks = Math.ceil(daysPerMonth / 7);
        return weeks * weeklyRentalRate;
      }
      // If used more than 1 week, use monthly rate
      else {
        return monthlyRentalRate;
      }
    };

    const monthlyRentalCost = getRentalCostPerMonth();

    for (let month = 1; month <= comparisonMonths; month++) {
      // Buying costs
      const totalMaintenanceCost = monthlyMaintenanceCost * month;
      const monthsElapsed = month / 12; // Convert to years for depreciation
      const currentResaleValue = purchasePrice * (resaleValuePercentage / 100) * Math.pow(0.9, monthsElapsed);
      const netBuyCost = purchasePrice + totalMaintenanceCost - currentResaleValue;

      // Renting costs
      const totalRentalCost = monthlyRentalCost * month;

      comparison.push({
        year: month, // Using 'year' property for chart compatibility, but it's actually months
        buyCost: Math.round(netBuyCost),
        rentCost: Math.round(totalRentalCost),
        savings: Math.round(totalRentalCost - netBuyCost)
      });
    }

    return { comparison };
  };

  const results = calculateToolCosts();

  // Transform the data to match what CostChart expects for tools
  const transformedComparison = results.comparison.map(item => ({
    ...item,
    leaseCost: item.rentCost, // Map rentCost to leaseCost for chart compatibility
    loanCost: item.buyCost    // Map buyCost to loanCost for chart compatibility
  }));

  return (
    <div className="calculator-content">
      <main className="app-main">
        <div className="forms-container">
          <div className="form-section">
            <h3><i className="lni lni-hammer"></i>Tool Information</h3>
            
            <div className="form-group">
              <label>Tool Name</label>
              <input
                type="text"
                name="toolName"
                value={toolData.toolName}
                onChange={(e) => setToolData(prev => ({ ...prev, toolName: e.target.value }))}
                placeholder="e.g., Lawn Mower, Circular Saw"
              />
            </div>

            <div className="form-group">
              <label>Purchase Price ($)</label>
              <input
                type="number"
                name="purchasePrice"
                value={toolData.purchasePrice}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
            </div>

            <div className="form-group">
              <label>Usage Days Per Month</label>
              <input
                type="number"
                name="usageDaysPerMonth"
                value={toolData.usageDaysPerMonth}
                onChange={handleInputChange}
                min="1"
                step="1"
              />
            </div>

            <div className="form-group">
              <label>Monthly Maintenance Cost ($)</label>
              <input
                type="number"
                name="monthlyMaintenanceCost"
                value={toolData.monthlyMaintenanceCost}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
            </div>
          </div>

          <div className="form-section">
            <h3><i className="lni lni-money-protection"></i>Rental Rates</h3>
            
            <div className="form-group">
              <label>Daily Rental Rate ($)</label>
              <input
                type="number"
                name="dailyRentalRate"
                value={toolData.dailyRentalRate}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
            </div>

            <div className="form-group">
              <label>Weekly Rental Rate ($)</label>
              <input
                type="number"
                name="weeklyRentalRate"
                value={toolData.weeklyRentalRate}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
            </div>

            <div className="form-group">
              <label>Monthly Rental Rate ($)</label>
              <input
                type="number"
                name="monthlyRentalRate"
                value={toolData.monthlyRentalRate}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
            </div>
          </div>

          <div className="form-section">
            <h3><i className="lni lni-calculator"></i>Analysis Parameters</h3>
            
            <div className="form-group">
              <label>Resale Value (% of purchase price)</label>
              <input
                type="number"
                name="resaleValuePercentage"
                value={toolData.resaleValuePercentage}
                onChange={handleInputChange}
                min="0"
                max="100"
                step="1"
              />
            </div>

            <div className="form-group">
              <label>Comparison Period (months)</label>
              <input
                type="number"
                name="comparisonMonths"
                value={toolData.comparisonMonths}
                onChange={handleInputChange}
                min="1"
                max="60"
                step="1"
              />
            </div>
          </div>
        </div>

        <div className="results-container">
          <Recommendation results={results} comparisonYears={toolData.comparisonMonths} type="tool" />
          
          <CostChart comparison={transformedComparison} type="tool" />

          <Summary results={results} vehiclePrice={toolData.purchasePrice} comparisonYears={toolData.comparisonMonths} type="tool" toolName={toolData.toolName} />
        </div>
      </main>
    </div>
  );
};

export default ToolsCalculator;