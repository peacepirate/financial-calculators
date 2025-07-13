import React, { useState, useMemo } from 'react';
import PropertyForm from './PropertyForm';
import MortgageForm from './MortgageForm';
import RentForm from './RentForm';
import InvestmentForm from './InvestmentForm';
import CostChart from './CostChart';
import Summary from './Summary';
import Recommendation from './Recommendation';
import { calculateHomeCostComparison, findHomeBreakEvenPoint } from '../utils/homeCalculations';

const HomeCalculator = () => {
  const [propertyData, setPropertyData] = useState({
    price: 400000,
    appreciationRate: 3.5,
    propertyTax: 8000,
    maintenanceCost: 4000,
    comparisonYears: 30
  });

  const [mortgageData, setMortgageData] = useState({
    downPayment: 80000,
    interestRate: 6.5,
    termYears: 30,
    closingCosts: 8000
  });

  const [rentData, setRentData] = useState({
    monthlyRent: 2500,
    securityDeposit: 5000,
    rentIncrease: 3,
    rentersInsurance: 300
  });

  const [investmentData, setInvestmentData] = useState({
    annualReturn: 7.5,
    monthlyInvestment: 0,
    annualFees: 0.5,
    savingsInvestmentRate: 50
  });

  const results = useMemo(() => {
    return calculateHomeCostComparison(
      propertyData.price,
      mortgageData,
      rentData,
      propertyData,
      propertyData.comparisonYears,
      investmentData
    );
  }, [propertyData, mortgageData, rentData, investmentData]);

  const breakEvenPoint = useMemo(() => {
    return findHomeBreakEvenPoint(results.comparison);
  }, [results]);

  return (
    <div className="calculator-content">
      <main className="app-main">
        <div className="forms-container">
          <PropertyForm values={propertyData} onChange={setPropertyData} />
          <MortgageForm values={mortgageData} onChange={setMortgageData} />
          <RentForm values={rentData} onChange={setRentData} />
          <InvestmentForm values={investmentData} onChange={setInvestmentData} />
        </div>

        <div className="results-container">
          <Recommendation 
            results={results} 
            comparisonYears={propertyData.comparisonYears}
            type="home"
          />
          <CostChart 
            comparison={results.comparison} 
            breakEvenPoint={breakEvenPoint} 
            type="home"
            investmentValues={results.investmentValues}
          />
          <Summary 
            results={results} 
            vehiclePrice={propertyData.price}
            comparisonYears={propertyData.comparisonYears}
            type="home"
          />
        </div>
      </main>
    </div>
  );
};

export default HomeCalculator;