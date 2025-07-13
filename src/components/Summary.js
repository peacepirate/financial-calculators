import React from 'react';

const Summary = ({ results, vehiclePrice, comparisonYears, type = 'car' }) => {
  if (!results) return null;

  const { comparison } = results;
  const finalYear = comparison[comparison.length - 1];
  
  if (type === 'home') {
    const { mortgageCosts, rentCosts } = results;
    const totalBuyCostOverPeriod = finalYear.buyCost;
    const totalRentCostOverPeriod = finalYear.rentCost;
    const netBuyCostOverPeriod = finalYear.netBuyCost;
    
    return (
      <div className="summary-container">
        <h3><i className="lni lni-bar-chart"></i> Cost Analysis Summary</h3>
        
        <div className="summary-grid">
          <div className="summary-section">
            <h4>Monthly Payments</h4>
            <div className="cost-item">
              <span>Mortgage Payment:</span>
              <span>${mortgageCosts.monthlyPayment.toLocaleString()}</span>
            </div>
            <div className="cost-item">
              <span>Total Housing (Buy):</span>
              <span>${mortgageCosts.totalMonthlyCost.toLocaleString()}</span>
            </div>
            <div className="cost-item">
              <span>Total Housing (Rent):</span>
              <span>${rentCosts.totalMonthlyCost.toLocaleString()}</span>
            </div>
            <div className="cost-item difference">
              <span>Monthly Difference:</span>
              <span style={{color: (mortgageCosts.totalMonthlyCost - rentCosts.totalMonthlyCost) > 0 ? '#27ae60' : '#e74c3c'}}>
                {(mortgageCosts.totalMonthlyCost - rentCosts.totalMonthlyCost) > 0 ? 
                  `Save $${Math.abs(mortgageCosts.totalMonthlyCost - rentCosts.totalMonthlyCost).toLocaleString()} by renting` :
                  `Save $${Math.abs(mortgageCosts.totalMonthlyCost - rentCosts.totalMonthlyCost).toLocaleString()} by buying`
                }
              </span>
            </div>
          </div>

          <div className="summary-section">
            <h4>Total Costs (After {comparisonYears} Years)</h4>
            <div className="cost-item">
              <span>Total Rent Cost:</span>
              <span>${totalRentCostOverPeriod.toLocaleString()}</span>
            </div>
            <div className="cost-item">
              <span>Net Buy Cost:</span>
              <span>${netBuyCostOverPeriod.toLocaleString()}</span>
            </div>
            <div className="cost-item">
              <span>Home Value:</span>
              <span>${finalYear.homeValue.toLocaleString()}</span>
            </div>
            <div className="cost-item">
              <span>Home Equity:</span>
              <span>${finalYear.homeEquity.toLocaleString()}</span>
            </div>
          </div>

          <div className="summary-section">
            <h4>Key Metrics</h4>
            <div className="cost-item">
              <span>Total Interest Paid:</span>
              <span>${mortgageCosts.totalInterest.toLocaleString()}</span>
            </div>
            <div className="cost-item">
              <span>Property Appreciation:</span>
              <span>${(finalYear.homeValue - vehiclePrice).toLocaleString()}</span>
            </div>
            <div className="cost-item">
              <span>Cost per Year (Rent):</span>
              <span>${(totalRentCostOverPeriod / comparisonYears).toLocaleString()}</span>
            </div>
            <div className="cost-item">
              <span>Cost per Year (Buy):</span>
              <span>${(netBuyCostOverPeriod / comparisonYears).toLocaleString()}</span>
            </div>
          </div>

          <div className="summary-section considerations">
            <h4>Buying vs Renting Comparison</h4>
            <div className="pros-cons-table">
              <div className="comparison-column">
                <h5 className="buying-header">Buying</h5>
                <div className="pros-section">
                  <h6>Pros</h6>
                  <ul>
                    <li>Build equity and ownership</li>
                    <li>Potential property appreciation</li>
                    <li>Tax deductions available</li>
                    <li>Stable monthly payments</li>
                    <li>Freedom to modify property</li>
                  </ul>
                </div>
                <div className="cons-section">
                  <h6>Cons</h6>
                  <ul>
                    <li>Large down payment required</li>
                    <li>Responsible for maintenance</li>
                    <li>Property tax obligations</li>
                    <li>Less mobility/flexibility</li>
                    <li>Market risk exposure</li>
                  </ul>
                </div>
              </div>
              
              <div className="comparison-column">
                <h5 className="leasing-header">Renting</h5>
                <div className="pros-section">
                  <h6>Pros</h6>
                  <ul>
                    <li>Lower upfront costs</li>
                    <li>No maintenance responsibility</li>
                    <li>Greater mobility/flexibility</li>
                    <li>No property tax burden</li>
                    <li>Predictable monthly costs</li>
                  </ul>
                </div>
                <div className="cons-section">
                  <h6>Cons</h6>
                  <ul>
                    <li>No equity building</li>
                    <li>Rent increases over time</li>
                    <li>No tax benefits</li>
                    <li>Limited control over property</li>
                    <li>No appreciation benefits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Car calculation logic (existing)
  const { loanCosts, leaseCosts } = results;
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