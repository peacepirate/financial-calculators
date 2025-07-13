import React from 'react';

const Recommendation = ({ results, comparisonYears }) => {
  if (!results) return null;

  const { comparison } = results;
  const finalYear = comparison[comparison.length - 1];
  
  const totalLeaseCostOverPeriod = finalYear.leaseCost;
  const totalNetBuyCostOverPeriod = finalYear.netLoanCost;
  
  const savings = totalLeaseCostOverPeriod - totalNetBuyCostOverPeriod;
  const betterOption = savings > 0 ? 'buying' : 'leasing';
  const savingsAmount = Math.abs(savings);

  return (
    <div className={`recommendation-banner ${betterOption}`}>
      <div className="recommendation-content">
        <div className="recommendation-main">
          <span className="recommendation-label">Recommendation:</span>
          <span className="recommendation-choice">
            {betterOption === 'buying' ? 'Buy' : 'Lease'} this vehicle
          </span>
        </div>
        <div className="recommendation-savings">
          Save ${savingsAmount.toLocaleString()} over {comparisonYears} years
        </div>
      </div>
    </div>
  );
};

export default Recommendation;