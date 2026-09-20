import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import BrandStatementSection from './sections/BrandStatementSection';
import FoodDiscoverySection from './sections/FoodDiscoverySection';

function App() {
  return (
    <div
      className="font-sans min-h-screen bg-brand-cream text-brand-black selection:bg-brand-green selection:text-brand-white"
    >
      <Navbar />
      <HeroSection />
      <BrandStatementSection />
      <FoodDiscoverySection />
    </div>
  );
}

export default App;
