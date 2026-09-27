import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageLoader from './components/PageLoader';
import HeroSection from './sections/HeroSection';
import UspStripSection from './sections/UspStripSection';
import FullMenuSection from './sections/FullMenuSection';
import SubscriptionSection from './sections/SubscriptionSection';
import HowItWorksSection from './sections/HowItWorksSection';
import TestimonialsSection from './sections/TestimonialsSection';
import FaqSection from './sections/FaqSection';
import Footer from './components/Footer';

function HomePage() {
  return (
    <>
      <HeroSection />
      <UspStripSection />
      <FullMenuSection />
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
        <Route path="/menu" element={<RedirectToMenu />} />
      </Routes>
    </div>
  );
}

function RedirectToMenu() {
  React.useEffect(() => { window.location.replace('/#menu'); }, []);
  return null;
}
