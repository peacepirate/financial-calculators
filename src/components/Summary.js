import React from 'react';

const Summary = ({ results, vehiclePrice, comparisonYears }) => {
  if (!results) return null;

  const { comparison, loanCosts, leaseCosts } = results;
  const finalYear = comparison[comparison.length - 1];
  
  const loanMonthlyPayment = loanCosts.monthlyPayment;
  const leaseMonthlyPayment = leaseCosts.monthlyPayment;
  
  const totalLeaseCostOverPeriod = finalYear.leaseCost;
  const totalNetBuyCostOverPeriod = finalYear.netLoanCost;
  
  const savings = totalLeaseCostOverPeriod - totalNetBuyCostOverPeriod;
  const betterOption = savings > 0 ? 'buying' : 'leasing';
  const savingsAmount = Math.abs(savings);

  return (
    <div className="summary-container">
      <h3><i className="lni lni-bar-chart"></i> Cost Analysis Summary</h3>
      
      <div className="summary-grid">
        <div className="summary-section">
          <h4>Monthly Payments</h4>
          <div className="cost-item">
            <span>Loan Payment:</span>
            <span>${loanMonthlyPayment.toLocaleString()}</span>
          </div>
          <div className="cost-item">
            <span>Lease Payment:</span>
            <span>${leaseMonthlyPayment.toLocaleString()}</span>
          </div>
          <div className="cost-item">
            <span>Monthly Difference:</span>
            <span>${Math.abs(loanMonthlyPayment - leaseMonthlyPayment).toLocaleString()}</span>
          </div>
        </div>

        <div className="summary-section">
          <h4>Total Costs (After {comparisonYears} Years)</h4>
          <div className="cost-item">
            <span>Total Lease Cost:</span>
            <span>${totalLeaseCostOverPeriod.toLocaleString()}</span>
          </div>
          <div className="cost-item">
            <span>Net Buy Cost:</span>
            <span>${totalNetBuyCostOverPeriod.toLocaleString()}</span>
          </div>
          <div className="cost-item">
            <span>Vehicle Value Remaining:</span>
            <span>${finalYear.vehicleValue.toLocaleString()}</span>
          </div>
        </div>

        <div className="summary-section">
          <h4>Key Metrics</h4>
          <div className="cost-item">
            <span>Total Interest Paid:</span>
            <span>${loanCosts.totalInterest.toLocaleString()}</span>
          </div>
          <div className="cost-item">
            <span>Total Depreciation:</span>
            <span>${(vehiclePrice - finalYear.vehicleValue).toLocaleString()}</span>
          </div>
          <div className="cost-item">
            <span>Cost per Year (Lease):</span>
            <span>${(totalLeaseCostOverPeriod / comparisonYears).toLocaleString()}</span>
          </div>
          <div className="cost-item">
            <span>Cost per Year (Buy):</span>
            <span>${(totalNetBuyCostOverPeriod / comparisonYears).toLocaleString()}</span>
          </div>
        </div>

        <div className="summary-section considerations">
          <h4>Buying vs Leasing Comparison</h4>
          <div className="pros-cons-table">
            <div className="comparison-column">
              <h5 className="buying-header">Buying</h5>
              <div className="pros-section">
                <h6>Pros</h6>
                <ul>
                  <li>Build equity and ownership</li>
                  <li>No mileage restrictions</li>
                  <li>Modify vehicle as desired</li>
                  <li>No wear and tear charges</li>
                  <li>Can sell anytime</li>
                </ul>
              </div>
              <div className="cons-section">
                <h6>Cons</h6>
                <ul>
                  <li>Higher monthly payments</li>
                  <li>Responsible for maintenance</li>
                  <li>Depreciation risk</li>
                  <li>Larger down payment</li>
                  <li>Out-of-warranty repairs</li>
                </ul>
              </div>
            </div>
            
            <div className="comparison-column">
              <h5 className="leasing-header">Leasing</h5>
              <div className="pros-section">
                <h6>Pros</h6>
                <ul>
                  <li>Lower monthly payments</li>
                  <li>Warranty coverage</li>
                  <li>Newer technology</li>
                  <li>Smaller down payment</li>
                  <li>Predictable costs</li>
                </ul>
              </div>
              <div className="cons-section">
                <h6>Cons</h6>
                <ul>
                  <li>No equity building</li>
                  <li>Mileage restrictions</li>
                  <li>Wear and tear charges</li>
                  <li>Continuous payments</li>
                  <li>Early termination fees</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;