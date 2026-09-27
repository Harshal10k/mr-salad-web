import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import UspStripSection from './sections/UspStripSection';
import FullMenuSection from './sections/FullMenuSection';
import SubscriptionSection from './sections/SubscriptionSection';
import HowItWorksSection from './sections/HowItWorksSection';
import TestimonialsSection from './sections/TestimonialsSection';
import FaqSection from './sections/FaqSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans min-h-screen bg-brand-cream text-brand-black selection:bg-brand-green selection:text-brand-white">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              {/* 1. HERO */}
              <HeroSection />

              {/* 2. USP STRIP */}
              <UspStripSection />

              {/* 3. MENU (Salads, Bowls, Smoothie Bowls, Between Bread, Snacks, Juices, Create Your Salad) */}
              <FullMenuSection />

              {/* 4. 26-DAY WELLNESS SUBSCRIPTION */}
              <SubscriptionSection />

              {/* 5. HOW IT WORKS */}
              <HowItWorksSection />

              {/* 6. TESTIMONIALS / SOCIAL PROOF */}
              <TestimonialsSection />

              {/* 7. FAQ */}
              <FaqSection />

              {/* 8. FOOTER / CONTACT */}
              <Footer />
            </main>
          }
        />
        {/* Redirect any /menu link back to home with smooth anchor */}
        <Route path="/menu" element={<RedirectToMenu />} />
      </Routes>
    </div>
  );
}

function RedirectToMenu() {
  React.useEffect(() => {
    window.location.replace('/#menu');
  }, []);
  return null;
}

export default App;
