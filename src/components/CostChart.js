import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CostChart = ({ comparison, breakEvenPoint, leaseParams, type = 'car', investmentValues }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#bbb'
        }
      },
      title: {
        display: true,
        text: type === 'home' ? 'Rent vs Buy Cost Comparison Over Time' : 'Total Cost Comparison Over Time',
        font: {
          size: 16
        },
        color: '#e0e0e0'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            const year = context.parsed.x;
            const comparisonData = comparison[year];
            
            if (type === 'home') {
              if (context.dataset.label === 'Buy Total Payments') {
                return [
                  `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`,
                  `▲ Home Value: $${comparisonData.homeValue.toLocaleString()}`,
                  `◆ Net Cost: $${comparisonData.netBuyCost.toLocaleString()}`,
                  `◆ Home Equity: $${comparisonData.homeEquity.toLocaleString()}`
                ];
              } else if (context.dataset.label === 'Investment Portfolio' && investmentValues && investmentValues.monthlyDetails) {
                const details = investmentValues.monthlyDetails;
                
                return [
                  `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`,
                  `💰 Monthly Investment: $${details.totalMonthlyInvestment.toLocaleString()}`,
                  `    • Additional: $${details.additionalMonthlyInvestment.toLocaleString()}`,
                  `    • Auto: $${details.monthlyInvestmentFromDifference.toLocaleString()} ${details.savingsSource}`
                ];
              } else {
                return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
              }
            } else {
              if (context.dataset.label === 'Buy Total Payments') {
                return [
                  `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`,
                  `▲ Vehicle Value: $${comparisonData.vehicleValue.toLocaleString()}`,
                  `◆ Net Cost: $${comparisonData.netLoanCost.toLocaleString()}`
                ];
              } else {
                return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
              }
            }
          },
          afterBody: function(tooltipItems) {
            if (type === 'home') {
              return [];
            }
            
            const year = tooltipItems[0].parsed.x;
            
            // Check if this is a lease renewal year
            const isLeaseRenewal = year > 0 && year % leaseParams.termYears === 0 && year < comparison.length - 1;
            
            if (isLeaseRenewal) {
              return [
                '',
                '↻ Lease Renewal Year!',
                `$ New down payment: $${leaseParams.downPayment.toLocaleString()}`,
                '→ Starting new lease cycle'
              ];
            }
            return [];
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (Years)',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#bbb'
        },
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#b2bec3'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Total Cost ($)',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#bbb'
        },
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#b2bec3',
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6
      },
      line: {
        borderWidth: 3
      }
    }
  };

  const labels = comparison.map(item => item.year);

  // Create arrays for special styling of lease renewal points (car only)
  let leasePointColors, leasePointSizes;
  if (type === 'car') {
    leasePointColors = comparison.map((item, index) => {
      const year = item.year;
      const isLeaseRenewal = year > 0 && year % leaseParams.termYears === 0 && year < comparison.length - 1;
      return isLeaseRenewal ? '#f39c12' : '#e74c3c'; // Orange for renewal years, red for normal
    });

    leasePointSizes = comparison.map((item, index) => {
      const year = item.year;
      const isLeaseRenewal = year > 0 && year % leaseParams.termYears === 0 && year < comparison.length - 1;
      return isLeaseRenewal ? 8 : 4; // Larger points for renewal years
    });
  } else {
    leasePointColors = '#e74c3c';
    leasePointSizes = 4;
  }

  const data = {
    labels,
    datasets: type === 'home' ? [
      {
        label: 'Rent Total Payments',
        data: comparison.map(item => item.rentCost),
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: '#e74c3c',
        pointBorderColor: '#999',
        pointBorderWidth: 2,
        pointRadius: 4
      },
      {
        label: 'Buy Total Payments',
        data: comparison.map(item => item.buyCost),
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: '#3498db',
        pointBorderColor: '#999',
        pointBorderWidth: 2,
        pointRadius: 4
      },
      {
        label: 'Home Equity',
        data: comparison.map(item => item.homeEquity),
        borderColor: '#27ae60',
        backgroundColor: 'rgba(39, 174, 96, 0.1)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: '#27ae60',
        pointBorderColor: '#999',
        pointBorderWidth: 2,
        pointRadius: 4
      },
      {
        label: 'Investment Portfolio',
        data: comparison.map(item => item.investmentValue),
        borderColor: '#f39c12',
        backgroundColor: 'rgba(243, 156, 18, 0.1)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: '#f39c12',
        pointBorderColor: '#999',
        pointBorderWidth: 2,
        pointRadius: 4
      }
    ] : [
      {
        label: 'Lease Total Payments',
        data: comparison.map(item => item.leaseCost),
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: leasePointColors,
        pointBorderColor: '#999',
        pointBorderWidth: 2,
        pointRadius: leasePointSizes
      },
      {
        label: 'Buy Total Payments',
        data: comparison.map(item => item.loanCost),
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: '#3498db',
        pointBorderColor: '#999',
        pointBorderWidth: 2,
        pointRadius: 4
      }
    ],
  };

  return (
    <div className="chart-container">
      <Line options={options} data={data} />
      {breakEvenPoint && (
        <div className="break-even-info">
          <p>
            <strong>Break-even analysis:</strong> At year {breakEvenPoint.year}, 
            {breakEvenPoint.point === 'lease_becomes_expensive' 
              ? ' leasing becomes more expensive than buying'
              : ' buying becomes more expensive than leasing'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default CostChart;