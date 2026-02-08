import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ComplaintSystem from './components/ComplaintSystem';
import ReviewTracker from './components/ReviewTracker';
import MaterialCalculator from './components/MaterialCalculator';
import Converter2Dto3D from './components/Converter2Dto3D';

function App() {
  const [activeTab, setActiveTab] = useState('complaints');

  const renderContent = () => {
    switch(activeTab) {
      case 'complaints': return <ComplaintSystem />;
      case 'reviews': return <ReviewTracker />;
      case 'calculator': return <MaterialCalculator />;
      case '2d3d': return <Converter2Dto3D />;
      default: return <ComplaintSystem />;
    }
  };

  return (
    <div className="app-container">
      <Navbar setActiveTab={setActiveTab} />
      
      <header className="hero">
        <h1>Simplify Your Life</h1>
        <p>One Click at a Time</p>
      </header>

      <main className="content-area">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;