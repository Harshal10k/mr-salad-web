import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND, getWhatsAppEnquiryUrl } from '../config/brand';

const FAQ_ITEMS = [
  {
    q: 'What areas do you deliver to?',
    a: 'We operate out of Bajaj Nagar, Nagpur. Delivery coverage across neighborhoods is serviced via our delivery partners. Delivery radius & exact areas: [TO BE CONFIRMED].',
  },
  {
    q: 'What are your delivery timings?',
    a: 'Daily studio operational hours and delivery timings: [TO BE CONFIRMED — Please check live operating status on Zomato / Swiggy].',
  },
  {
    q: 'How do I order a meal?',
    a: 'We do not take direct food orders, carts, or payments on this website. For individual meals, click any "VIEW / ORDER" button on our menu to open Zomato or Swiggy.',
  },
  {
    q: 'Where can I order Mr. Salad?',
    a: 'Online for delivery on Zomato and Swiggy, or directly connect with our studio kitchen located in Bajaj Nagar, Nagpur for subscription enquiries.',
  },
  {
    q: 'How does the 26-day wellness plan work?',
    a: 'The 26-day plan features a dedicated whole-food meal for each day designed around variety and high protein. All meals are prepared fresh with zero deep frying.',
  },
  {
    q: 'Can I customize my meals?',
    a: 'Yes! You can specify vegetarian or egg-friendly options, or mention specific exclusions when setting up your subscription.',
  },
  {
    q: 'Can I add extra protein?',
    a: 'Yes. Protein boosters such as paneer, sprouts, boiled eggs, or whey protein can be arranged for custom orders and subscription plans.',
  },
  {
    q: 'Can I pause or cancel my subscription?',
    a: 'Yes, pause requests are supported with advance notice prior to meal prep. Specific notice window and terms: [TO BE CONFIRMED upon subscription enquiry].',
  },
  {
    q: 'How do I enquire about a subscription?',
    a: `Simply click "Subscribe Now" on this page or message us on WhatsApp at ${BRAND.phone}. We will share current rates, availability, and start dates.`,
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative bg-brand-cream text-brand-black py-20 md:py-28 border-t border-brand-black/10">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-green font-bold">
            Questions & Answers
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[0.95] text-brand-black uppercase mt-2">
            FREQUENTLY ASKED<br />QUESTIONS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-black/60 max-w-lg mx-auto">
            Everything you need to know about our food, ordering on delivery apps, and subscription plans.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className="bg-brand-white rounded-2xl border border-brand-black/10 overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base sm:text-lg font-bold text-brand-black">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full bg-brand-black/5 flex items-center justify-center font-mono text-xs transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-brand-green text-white' : 'text-brand-black/60'
                    }`}
                  >
                    ↓
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-black/70 leading-relaxed border-t border-brand-black/5">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs text-brand-black/50 mb-3">
            Still have questions about our ingredients or subscriptions?
          </p>
          <a
            href={getWhatsAppEnquiryUrl('custom_salad')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-green text-white hover:bg-brand-dark transition-colors shadow-xs"
          >
            Chat with Mr. Salad on WhatsApp ↗
          </a>
        </div>
      </div>
    </section>
  );
}
