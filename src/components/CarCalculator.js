import React, { useState, useMemo } from 'react';
import VehicleForm from './VehicleForm';
import LoanForm from './LoanForm';
import LeaseForm from './LeaseForm';
import CostChart from './CostChart';
import Summary from './Summary';
import Recommendation from './Recommendation';
import { calculateCostComparison, findBreakEvenPoint } from '../utils/calculations';

const CarCalculator = () => {
  const [vehicleData, setVehicleData] = useState({
    price: 30000,
    depreciationRate: 15,
    comparisonYears: 10
  });

  const [loanData, setLoanData] = useState({
    downPayment: 5000,
    interestRate: 6.5,
    termYears: 5
  });

  const [leaseData, setLeaseData] = useState({
    monthlyPayment: 400,
    downPayment: 2000,
    termYears: 3,
    mileageLimit: 12000
  });

  const results = useMemo(() => {
    return calculateCostComparison(
      vehicleData.price,
      loanData,
      leaseData,
      vehicleData.comparisonYears,
      vehicleData.depreciationRate
    );
  }, [vehicleData, loanData, leaseData]);

  const breakEvenPoint = useMemo(() => {
    return findBreakEvenPoint(results.comparison);
  }, [results]);

  return (
    <div className="calculator-content">
      <main className="app-main">
        <div className="forms-container">
          <VehicleForm values={vehicleData} onChange={setVehicleData} />
          <LoanForm values={loanData} onChange={setLoanData} />
          <LeaseForm values={leaseData} onChange={setLeaseData} />
        </div>

        <div className="results-container">
          <Recommendation 
            results={results} 
            comparisonYears={vehicleData.comparisonYears}
          />
          <CostChart comparison={results.comparison} breakEvenPoint={breakEvenPoint} leaseParams={leaseData} />
          <Summary 
            results={results} 
            vehiclePrice={vehicleData.price}
            comparisonYears={vehicleData.comparisonYears}
          />
        </div>
      </main>
    </div>
  );
};

export default CarCalculator;