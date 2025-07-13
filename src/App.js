import React, { useState } from 'react';
import TabNavigation from './components/TabNavigation';
import CarCalculator from './components/CarCalculator';
import HomeCalculator from './components/HomeCalculator';
import ServicesCalculator from './components/ServicesCalculator';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('car');

  const renderCalculator = () => {
    switch (activeTab) {
      case 'car':
        return <CarCalculator />;
      case 'home':
        return <HomeCalculator />;
      case 'services':
        return <ServicesCalculator />;
      default:
        return <CarCalculator />;
    }
  };

  return (
    <div className="app">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderCalculator()}
    </div>
  );
}

export default App;
