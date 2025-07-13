export const calculateLoanCosts = (vehiclePrice, downPayment, interestRate, loanTermYears) => {
  const principal = vehiclePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;
  
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                        (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  const totalInterest = (monthlyPayment * totalMonths) - principal;
  const totalCost = downPayment + principal + totalInterest;
  
  return {
    monthlyPayment,
    totalInterest,
    totalCost,
    principal
  };
};

export const calculateDepreciation = (vehiclePrice, years, depreciationRate = 15) => {
  const depreciation = [];
  let currentValue = vehiclePrice;
  
  for (let year = 0; year <= years; year++) {
    depreciation.push({
      year,
      value: currentValue,
      depreciated: vehiclePrice - currentValue
    });
    currentValue = currentValue * (1 - depreciationRate / 100);
  }
  
  return depreciation;
};

export const calculateLeaseCosts = (monthlyPayment, downPayment, leaseTermYears) => {
  const totalMonths = leaseTermYears * 12;
  const totalLeaseCost = downPayment + (monthlyPayment * totalMonths);
  
  return {
    monthlyPayment,
    totalLeaseCost,
    totalMonths
  };
};

export const calculateCostComparison = (
  vehiclePrice,
  loanParams,
  leaseParams,
  years = 10,
  depreciationRate = 15
) => {
  const loanCosts = calculateLoanCosts(
    vehiclePrice,
    loanParams.downPayment,
    loanParams.interestRate,
    loanParams.termYears
  );
  
  const leaseCosts = calculateLeaseCosts(
    leaseParams.monthlyPayment,
    leaseParams.downPayment,
    leaseParams.termYears
  );
  
  const depreciation = calculateDepreciation(vehiclePrice, years, depreciationRate);
  
  const comparison = [];
  let cumulativeLoanCost = loanCosts.totalCost;
  let cumulativeLeaseCost = 0;
  
  for (let year = 0; year <= years; year++) {
    if (year === 0) {
      cumulativeLoanCost = loanParams.downPayment;
      cumulativeLeaseCost = leaseParams.downPayment;
    } else if (year <= loanParams.termYears) {
      cumulativeLoanCost += loanCosts.monthlyPayment * 12;
    }
    
    // Add lease costs including new down payments for subsequent lease cycles
    if (year > 0) {
      // Add annual lease payments
      cumulativeLeaseCost += leaseParams.monthlyPayment * 12;
      
      // Check if we need a new down payment for the next lease cycle
      // This happens at the END of each lease term (when starting the next lease)
      // For 3-year lease: add down payment at years 3, 6, 9, etc. (for next lease period)
      if (year % leaseParams.termYears === 0 && year < years) {
        // End of lease term - need down payment for next lease
        cumulativeLeaseCost += leaseParams.downPayment;
      }
    }
    
    const vehicleValue = year < depreciation.length ? depreciation[year].value : 0;
    // Net cost = total paid - vehicle value (what you could sell it for)
    // This represents your true economic cost after accounting for the asset value
    // We'll use this for decision making but show total payments in the chart for clarity
    const netLoanCost = cumulativeLoanCost - vehicleValue;
    
    comparison.push({
      year,
      loanCost: cumulativeLoanCost,
      leaseCost: cumulativeLeaseCost,
      vehicleValue,
      netLoanCost,
      difference: cumulativeLeaseCost - netLoanCost
    });
  }
  
  return {
    comparison,
    loanCosts,
    leaseCosts,
    depreciation
  };
};

export const findBreakEvenPoint = (comparison) => {
  for (let i = 1; i < comparison.length; i++) {
    const prev = comparison[i - 1];
    const curr = comparison[i];
    
    if (prev.difference <= 0 && curr.difference >= 0) {
      return {
        year: curr.year,
        point: 'lease_becomes_expensive'
      };
    } else if (prev.difference >= 0 && curr.difference <= 0) {
      return {
        year: curr.year,
        point: 'buy_becomes_expensive'
      };
    }
  }
  
  return null;
};