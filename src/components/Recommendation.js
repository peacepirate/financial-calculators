import React from 'react';

const Recommendation = ({ results, comparisonYears, type = 'car' }) => {
  if (!results) return null;

  const { comparison } = results;
  const finalYear = comparison[comparison.length - 1];
  
  if (type === 'home') {
    const totalRentCostOverPeriod = finalYear.rentCost;
    const totalBuyCostOverPeriod = finalYear.buyCost;
    const homeEquityValue = finalYear.homeEquity;
    const investmentValue = finalYear.investmentValue;
    
    // Net positions: 
    // Renting: -rent costs + investment portfolio value
    // Buying: -buy costs + home equity value
    const rentingNetPosition = investmentValue - totalRentCostOverPeriod;
    const buyingNetPosition = homeEquityValue - totalBuyCostOverPeriod;
    
    const netDifference = buyingNetPosition - rentingNetPosition;
    const betterOption = netDifference > 0 ? 'buying' : 'renting';
    const advantageAmount = Math.abs(netDifference);

    return (
      <div className={`recommendation-banner ${betterOption === 'renting' ? 'leasing' : betterOption}`}>
        <div className="recommendation-content">
          <div className="recommendation-main">
            <span className="recommendation-label">Recommendation:</span>
            <span className="recommendation-choice">
              {betterOption === 'buying' ? 'Buy' : 'Rent'} this property
            </span>
          </div>
          <div className="recommendation-savings">
            ${advantageAmount.toLocaleString()} better net position after {comparisonYears} years
            <div style={{fontSize: '0.9rem', opacity: '0.8', marginTop: '4px'}}>
              {betterOption === 'buying' ? 
                `Buy: $${buyingNetPosition.toLocaleString()} vs Rent+Invest: $${rentingNetPosition.toLocaleString()}` :
                `Rent+Invest: $${rentingNetPosition.toLocaleString()} vs Buy: $${buyingNetPosition.toLocaleString()}`
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Car calculation logic (existing)
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