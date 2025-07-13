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

const CostChart = ({ comparison, breakEvenPoint, leaseParams }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e0e0e0'
        }
      },
      title: {
        display: true,
        text: 'Total Cost Comparison Over Time',
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
            
            if (context.dataset.label === 'Buy Total Payments') {
              return [
                `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`,
                `🏠 Vehicle Value: $${comparisonData.vehicleValue.toLocaleString()}`,
                `💎 Net Cost: $${comparisonData.netLoanCost.toLocaleString()}`
              ];
            } else {
              return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
            }
          },
          afterBody: function(tooltipItems) {
            const year = tooltipItems[0].parsed.x;
            
            // Check if this is a lease renewal year
            const isLeaseRenewal = year > 0 && year % leaseParams.termYears === 0 && year < comparison.length - 1;
            
            if (isLeaseRenewal) {
              return [
                '',
                '🔄 Lease Renewal Year!',
                `💰 New down payment: $${leaseParams.downPayment.toLocaleString()}`,
                '📝 Starting new lease cycle'
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
          color: '#e0e0e0'
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
          color: '#e0e0e0'
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

  // Create arrays for special styling of lease renewal points
  const leasePointColors = comparison.map((item, index) => {
    const year = item.year;
    const isLeaseRenewal = year > 0 && year % leaseParams.termYears === 0 && year < comparison.length - 1;
    return isLeaseRenewal ? '#f39c12' : '#e74c3c'; // Orange for renewal years, red for normal
  });

  const leasePointSizes = comparison.map((item, index) => {
    const year = item.year;
    const isLeaseRenewal = year > 0 && year % leaseParams.termYears === 0 && year < comparison.length - 1;
    return isLeaseRenewal ? 8 : 4; // Larger points for renewal years
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Lease Total Payments',
        data: comparison.map(item => item.leaseCost),
        borderColor: '#e74c3c',
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: leasePointColors,
        pointBorderColor: '#fff',
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
        pointBorderColor: '#fff',
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