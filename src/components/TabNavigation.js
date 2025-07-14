import React from 'react';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'car', label: 'Car', icon: 'lni lni-car' },
    { id: 'home', label: 'Home', icon: 'lni lni-home' },
    { id: 'tools', label: 'Tools', icon: 'lni lni-hammer' }
  ];

  return (
    <div className="tab-navigation">
      <header className="app-header">
        <h1>Lease vs Buy Calculator</h1>
        <p>Compare the total cost of ownership between leasing and buying</p>
      </header>
      <div className="tab-container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <i className={`tab-icon ${tab.icon}`}></i>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;