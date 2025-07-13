// Home rent vs buy calculation functions

export const calculateMortgageCosts = (homePrice, mortgageData, propertyData, years) => {
  const { downPayment, interestRate, termYears, closingCosts } = mortgageData;
  const { propertyTax, maintenanceCost } = propertyData;
  
  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = termYears * 12;
  
  // Calculate monthly mortgage payment
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  // Calculate total interest over loan term
  const totalInterest = (monthlyPayment * totalPayments) - loanAmount;
  
  // Monthly additional costs
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyMaintenance = maintenanceCost / 12;
  const monthlyInsurance = (homePrice * 0.003) / 12; // Estimate 0.3% of home value annually
  
  const totalMonthlyCost = monthlyPayment + monthlyPropertyTax + monthlyMaintenance + monthlyInsurance;
  
  return {
    monthlyPayment,
    monthlyPropertyTax,
    monthlyMaintenance,
    monthlyInsurance,
    totalMonthlyCost,
    totalInterest,
    downPayment,
    closingCosts,
    loanAmount
  };
};

export const calculateRentCosts = (rentData, years) => {
  const { monthlyRent, securityDeposit, rentIncrease, rentersInsurance } = rentData;
  
  let totalRentPaid = 0;
  let currentRent = monthlyRent;
  const monthlyInsurance = rentersInsurance / 12;
  
  // Calculate rent with annual increases
  for (let year = 0; year < years; year++) {
    if (year > 0) {
      currentRent *= (1 + rentIncrease / 100);
    }
    totalRentPaid += currentRent * 12;
  }
  
  const totalInsurance = rentersInsurance * years;
  const totalCost = totalRentPaid + totalInsurance;
  
  return {
    monthlyRent,
    monthlyInsurance,
    totalMonthlyCost: monthlyRent + monthlyInsurance,
    totalRentPaid,
    totalInsurance,
    totalCost,
    securityDeposit
  };
};

export const calculateHomeAppreciation = (homePrice, appreciationRate, years) => {
  const values = [];
  let currentValue = homePrice;
  
  for (let year = 0; year <= years; year++) {
    if (year > 0) {
      currentValue *= (1 + appreciationRate / 100);
    }
    values.push({
      year,
      value: currentValue,
      equity: currentValue - homePrice + (homePrice * 0.2) // Assuming 20% down payment for equity calc
    });
  }
  
  return values;
};

export const calculateInvestmentGrowth = (initialInvestment, monthlyContribution, annualReturn, annualFees, years) => {
  const values = [];
  let currentValue = initialInvestment;
  const monthlyReturn = (annualReturn - annualFees) / 100 / 12;
  
  for (let year = 0; year <= years; year++) {
    if (year === 0) {
      values.push({
        year,
        value: currentValue
      });
    } else {
      // Compound growth with monthly contributions
      for (let month = 0; month < 12; month++) {
        currentValue = currentValue * (1 + monthlyReturn) + monthlyContribution;
      }
      values.push({
        year,
        value: currentValue
      });
    }
  }
  
  return values;
};

export const calculateHomeCostComparison = (homePrice, mortgageData, rentData, propertyData, years, investmentData = null) => {
  const mortgageCosts = calculateMortgageCosts(homePrice, mortgageData, propertyData, years);
  const rentCosts = calculateRentCosts(rentData, years);
  const appreciationValues = calculateHomeAppreciation(homePrice, propertyData.appreciationRate, years);
  
  // Calculate investment growth if renting (using down payment + monthly difference/savings)
  let investmentValues = null;
  if (investmentData) {
    const totalRentCost = rentData.monthlyRent + rentData.rentersInsurance / 12;
    const monthlyCostDifference = mortgageCosts.totalMonthlyCost - totalRentCost;
    
    let monthlyInvestmentFromDifference = 0;
    if (monthlyCostDifference > 0) {
      // Renting is cheaper - invest the full difference
      monthlyInvestmentFromDifference = monthlyCostDifference;
    } else {
      // Buying is cheaper - invest specified percentage of the savings
      monthlyInvestmentFromDifference = Math.abs(monthlyCostDifference) * (investmentData.savingsInvestmentRate / 100);
    }
    
    const totalMonthlyInvestment = investmentData.monthlyInvestment + monthlyInvestmentFromDifference;
    investmentValues = calculateInvestmentGrowth(
      mortgageCosts.downPayment + mortgageCosts.closingCosts,
      totalMonthlyInvestment,
      investmentData.annualReturn,
      investmentData.annualFees,
      years
    );
    
    // Store investment details for tooltips
    investmentValues.monthlyDetails = {
      totalMonthlyInvestment,
      monthlyInvestmentFromDifference,
      additionalMonthlyInvestment: investmentData.monthlyInvestment,
      savingsSource: monthlyCostDifference > 0 ? 'from rent savings' : `from ${investmentData.savingsInvestmentRate}% of buy savings`
    };
  }
  
  const comparison = [];
  let cumulativeBuyCost = mortgageCosts.downPayment + mortgageCosts.closingCosts;
  let cumulativeRentCost = rentData.securityDeposit;
  let currentRent = rentData.monthlyRent;
  
  for (let year = 0; year <= years; year++) {
    if (year > 0) {
      // Update rent with annual increase
      currentRent *= (1 + rentData.rentIncrease / 100);
      
      // Add annual costs
      cumulativeBuyCost += mortgageCosts.totalMonthlyCost * 12;
      cumulativeRentCost += (currentRent + rentData.rentersInsurance / 12) * 12;
    }
    
    const homeValue = appreciationValues[year].value;
    const remainingLoanBalance = calculateRemainingBalance(
      mortgageCosts.loanAmount,
      mortgageData.interestRate / 100 / 12,
      mortgageData.termYears * 12,
      year * 12
    );
    
    const homeEquity = Math.max(0, homeValue - remainingLoanBalance);
    const netBuyCost = cumulativeBuyCost - homeEquity;
    
    const investmentValue = investmentValues ? investmentValues[year].value : 0;
    
    comparison.push({
      year,
      buyCost: cumulativeBuyCost,
      rentCost: cumulativeRentCost,
      netBuyCost,
      homeValue,
      homeEquity,
      remainingLoanBalance,
      investmentValue
    });
  }
  
  return {
    comparison,
    mortgageCosts,
    rentCosts,
    appreciationValues,
    investmentValues
  };
};

const calculateRemainingBalance = (principal, monthlyRate, totalPayments, paymentsMade) => {
  if (paymentsMade >= totalPayments) return 0;
  
  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  const remainingBalance = principal * 
    (Math.pow(1 + monthlyRate, totalPayments) - Math.pow(1 + monthlyRate, paymentsMade)) / 
    (Math.pow(1 + monthlyRate, totalPayments) - 1);
  
  return Math.max(0, remainingBalance);
};

export const findHomeBreakEvenPoint = (comparison) => {
  for (let i = 1; i < comparison.length; i++) {
    const current = comparison[i];
    const previous = comparison[i - 1];
    
    if (previous.netBuyCost > previous.rentCost && current.netBuyCost <= current.rentCost) {
      return {
        year: current.year,
        month: Math.round((current.rentCost - current.netBuyCost) / 
          ((current.rentCost - previous.rentCost) / 12))
      };
    }
  }
  
  return null;
};