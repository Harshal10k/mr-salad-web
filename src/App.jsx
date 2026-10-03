import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageLoader from './components/PageLoader';
import HeroSection from './sections/HeroSection';
import UspStripSection from './sections/UspStripSection';
import FoodDiscoverySection from './sections/FoodDiscoverySection';
import SubscriptionSection from './sections/SubscriptionSection';
import HowItWorksSection from './sections/HowItWorksSection';
import TestimonialsSection from './sections/TestimonialsSection';
import FaqSection from './sections/FaqSection';
import Footer from './components/Footer';
import MenuPage from './pages/MenuPage';

function HomePage() {
  return (
    <>
      <HeroSection />
      <UspStripSection />
      <FoodDiscoverySection />
      <SubscriptionSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-brand-white font-sans text-brand-black selection:bg-brand-green selection:text-brand-white">
      <PageLoader />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </div>
  );
}
