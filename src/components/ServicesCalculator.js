import React from 'react';

const ServicesCalculator = () => {
  return (
    <div className="calculator-content">
      <header className="app-header">
        <h1>Services Cost Calculator</h1>
        <p>Compare costs of various services and subscription models</p>
      </header>

      <main className="app-main">
        <div className="forms-container">
          <div className="form-section">
            <h3>Coming Soon</h3>
            <p>Services calculator will help you compare costs for:</p>
            <ul>
              <li>Software subscriptions vs one-time purchases</li>
              <li>Cloud services vs on-premise solutions</li>
              <li>Streaming services bundle analysis</li>
              <li>Professional services vs DIY costs</li>
              <li>Insurance plans and coverage options</li>
            </ul>
          </div>
        </div>

        <div className="results-container">
          <div className="summary-container">
            <h3>Calculator Types</h3>
            <div className="summary-grid">
              <div className="summary-section">
                <h4>Software & Apps</h4>
                <p>Compare subscription vs purchase models for software and applications.</p>
              </div>
              <div className="summary-section">
                <h4>Professional Services</h4>
                <p>Analyze costs of hiring professionals vs doing it yourself.</p>
              </div>
              <div className="summary-section">
                <h4>Subscription Analysis</h4>
                <p>Optimize your subscription portfolio and find cost savings.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicesCalculator;