# Car Lease vs Buy Calculator

A React-based application that helps you make informed decisions about whether to lease or buy a vehicle by comparing the total cost of ownership over time.

## Features

- **Comprehensive Cost Analysis**: Compare loan vs lease costs including down payments, monthly payments, interest, and depreciation
- **Interactive Charts**: Visual representation of cost progression over time using Chart.js
- **Break-even Analysis**: Identify when one option becomes more cost-effective than the other
- **Total Cost of Ownership**: Calculate and compare net costs accounting for vehicle depreciation
- **Responsive Design**: Mobile-friendly interface that works on all devices

## Core Calculations

### Loan Calculations
- Monthly payment calculation using principal, interest rate, and loan term
- Total interest paid over the loan period
- Vehicle depreciation and remaining value

### Lease Calculations
- Total lease costs including multiple lease cycles
- Cost comparison accounting for no vehicle ownership
- Mileage limit considerations

### Break-even Analysis
- Identifies crossover points between lease and buy costs
- Accounts for vehicle depreciation and equity building
- Provides clear recommendations based on financial analysis

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd car-lease-buy-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

## Usage

1. **Vehicle Information**: Enter the vehicle price, annual depreciation rate, and comparison period
2. **Loan Details**: Input down payment, interest rate, and loan term
3. **Lease Details**: Specify monthly payment, down payment, lease term, and mileage limits
4. **Results**: View the interactive chart and detailed cost analysis

## Key Metrics Displayed

- **Monthly Payments**: Compare loan vs lease monthly costs
- **Total Costs**: Net cost comparison over the specified time period
- **Break-even Point**: When one option becomes more favorable
- **Vehicle Equity**: Remaining vehicle value for purchase option
- **Annual Cost**: Year-over-year cost breakdown

## Technologies Used

- **React**: Frontend framework
- **Chart.js**: Data visualization
- **React Chart.js 2**: React wrapper for Chart.js
- **CSS Grid & Flexbox**: Responsive layout

## Project Structure

```
src/
├── components/
│   ├── VehicleForm.js    # Vehicle information input
│   ├── LoanForm.js       # Loan parameters input
│   ├── LeaseForm.js      # Lease parameters input
│   ├── CostChart.js      # Chart.js visualization
│   └── Summary.js        # Results summary
├── utils/
│   └── calculations.js   # Core calculation functions
├── App.js               # Main application component
├── App.css             # Application styling
└── index.js            # Application entry point
```

## Calculation Methodology

### Loan Cost Calculation
```javascript
monthlyPayment = principal × (monthlyRate × (1 + monthlyRate)^totalMonths) / ((1 + monthlyRate)^totalMonths - 1)
```

### Depreciation Model
- Uses annual depreciation rate (default 15%)
- Calculates vehicle value over time
- Accounts for equity building in purchase option

### Break-even Analysis
- Compares cumulative lease costs vs net buy costs (total cost - vehicle value)
- Identifies crossover points in the financial comparison
- Provides recommendations based on total cost of ownership

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.