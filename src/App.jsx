import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import ScrollProgressPill from './components/ScrollProgressPill';
import MenuPage from './pages/MenuPage';

// Resets the window scroll position to the very top whenever the route changes.
// Without this the browser restores the previous scroll position, landing the
// user mid-page (e.g. on FoodDiscovery) instead of at the Hero section.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <ScrollProgressPill />
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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </div>
  );
}
