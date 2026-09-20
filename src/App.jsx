import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import BrandStatementSection from './sections/BrandStatementSection';

function App() {
  return (
    <div
      className="font-sans min-h-screen bg-brand-cream text-brand-black selection:bg-brand-green selection:text-brand-white"
    >
      <Navbar />
      <HeroSection />
      <BrandStatementSection />
    </div>
  );
}

export default App;
