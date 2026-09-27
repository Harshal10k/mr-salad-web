import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SUBSCRIPTION_SCHEDULE, SUBSCRIPTION_WEEKS } from '../data/subscriptionData';
import { SUBSCRIPTION_PRICING, getWhatsAppEnquiryUrl } from '../config/brand';

export default function SubscriptionSection() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', '1', '2', '3', '4'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    plan: '26-Day Wellness Plan',
    dietPreference: 'Vegetarian',
    startDate: '',
    notes: '',
  });

  const filteredSchedule = activeTab === 'all'
    ? SUBSCRIPTION_SCHEDULE
    : SUBSCRIPTION_SCHEDULE.filter((item) => item.week === parseInt(activeTab, 10));

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    const details = `Name: ${leadForm.name || 'Not specified'} | Plan: ${leadForm.plan} | Diet: ${leadForm.dietPreference} | Start Date: ${leadForm.startDate || 'Immediate'} | Notes: ${leadForm.notes || 'None'}`;
    const url = getWhatsAppEnquiryUrl('subscription', details);
    window.open(url, '_blank');
    setIsModalOpen(false);
  };

  return (
    <section id="subscription" className="relative bg-brand-white text-brand-black py-20 md:py-28 border-t border-brand-black/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── HEADER ── */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-green font-bold">
              The Diet Studio Signature
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.93] text-brand-black uppercase">
            26-DAY<br />
            <span className="text-brand-green">WELLNESS</span><br />
            SUBSCRIPTION
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-black/70 leading-relaxed max-w-2xl font-medium">
            A disciplined, protein-conscious whole food plan with a unique meal designed for every single day. Prepared fresh in Bajaj Nagar, Nagpur with zero deep frying.
          </p>
        </div>

        {/* ── PRICING TIER CARDS (PLACEHOLDERS WHERE PRICING PENDING) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-20">
          {/* TIER 1: PER MEAL */}
          <div className="bg-brand-cream/60 rounded-3xl p-6 sm:p-8 border border-brand-black/10 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-brand-black/50 mb-2">
                DAILY TRIAL
              </div>
              <h3 className="font-display text-2xl font-black text-brand-black mb-1">
                PER MEAL
              </h3>
              <p className="text-xs text-brand-black/60 mb-6">
                Single wholesome lunch or dinner fix
              </p>
              <div className="mb-6">
                {SUBSCRIPTION_PRICING.mealPrice ? (
                  <span className="font-display text-3xl font-black text-brand-black">
                    ₹{SUBSCRIPTION_PRICING.mealPrice}
                  </span>
                ) : (
                  <div className="inline-block px-3 py-1.5 rounded-lg bg-brand-black/5 border border-brand-black/10 text-xs font-mono font-bold text-brand-black/70">
                    PRICE TO BE CONFIRMED
                  </div>
                )}
              </div>
              <ul className="space-y-2.5 text-xs text-brand-black/70 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-brand-green font-bold">✓</span> 1 Freshly crafted meal
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-green font-bold">✓</span> Air-fried / home-style clean prep
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-green font-bold">✓</span> Packed right before delivery
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                setLeadForm((prev) => ({ ...prev, plan: 'Per Meal Trial' }));
                setIsModalOpen(true);
              }}
              className="w-full py-3.5 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-white border border-brand-black/20 hover:border-brand-black text-brand-black transition-all text-center"
            >
              Enquire Single Meal →
            </button>
          </div>

          {/* TIER 2: WEEKLY */}
          <div className="bg-brand-cream/60 rounded-3xl p-6 sm:p-8 border border-brand-black/10 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-brand-black/50 mb-2">
                FLEXIBLE SCHEDULE
              </div>
              <h3 className="font-display text-2xl font-black text-brand-black mb-1">
                WEEKLY PLAN
              </h3>
              <p className="text-xs text-brand-black/60 mb-6">
                6 consecutive days of rotating meals
              </p>
              <div className="mb-6">
                {SUBSCRIPTION_PRICING.weeklyPrice ? (
                  <span className="font-display text-3xl font-black text-brand-black">
                    ₹{SUBSCRIPTION_PRICING.weeklyPrice}
                  </span>
                ) : (
                  <div className="inline-block px-3 py-1.5 rounded-lg bg-brand-black/5 border border-brand-black/10 text-xs font-mono font-bold text-brand-black/70">
                    PRICE TO BE CONFIRMED
                  </div>
                )}
              </div>
              <ul className="space-y-2.5 text-xs text-brand-black/70 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-brand-green font-bold">✓</span> 6 Daily unique rotating meals
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-green font-bold">✓</span> Calorie & protein mindful
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-green font-bold">✓</span> Flexible pause with 24h notice
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                setLeadForm((prev) => ({ ...prev, plan: 'Weekly Plan (6 Days)' }));
                setIsModalOpen(true);
              }}
              className="w-full py-3.5 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-white border border-brand-black/20 hover:border-brand-black text-brand-black transition-all text-center"
            >
              Enquire Weekly Plan →
            </button>
          </div>

          {/* TIER 3: 26-DAY FULL WELLNESS PLAN (FEATURED) */}
          <div className="relative bg-brand-green text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between overflow-hidden">
            <div className="absolute -right-12 -top-12 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-white/70">
                  FULL PROTOCOL
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                  Complete Habit
                </span>
              </div>
              <h3 className="font-display text-2xl font-black text-white mb-1">
                26-DAY PLAN
              </h3>
              <p className="text-xs text-white/75 mb-6">
                26 days of curated, diverse whole-food nutrition
              </p>
              <div className="mb-6">
                {SUBSCRIPTION_PRICING.fullPlanPrice ? (
                  <span className="font-display text-3xl font-black text-white">
                    ₹{SUBSCRIPTION_PRICING.fullPlanPrice}
                  </span>
                ) : (
                  <div className="inline-block px-3 py-1.5 rounded-lg bg-white/15 border border-white/25 text-xs font-mono font-bold text-white">
                    PRICE TO BE CONFIRMED
                  </div>
                )}
              </div>
              <ul className="space-y-2.5 text-xs text-white/85 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-white font-bold">✓</span> 26 Different meals — zero repetition
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white font-bold">✓</span> High-protein recipes designed for steady energy
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white font-bold">✓</span> Personalized dietary preferences (Veg/Egg)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white font-bold">✓</span> Dedicated WhatsApp concierge
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                setLeadForm((prev) => ({ ...prev, plan: '26-Day Wellness Plan' }));
                setIsModalOpen(true);
              }}
              className="w-full py-4 rounded-full text-xs font-bold tracking-wider uppercase bg-white text-brand-green hover:bg-brand-cream transition-all shadow-md text-center hover:scale-[1.02]"
            >
              SUBSCRIBE NOW →
            </button>
          </div>
        </div>

        {/* ── 26-DAY INTERACTIVE SCHEDULE & TIMELINE ── */}
        <div className="mt-12 pt-12 border-t border-brand-black/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-mono font-bold text-brand-green uppercase tracking-wider">
                Full Curriculum
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-brand-black uppercase mt-1">
                26-Day Meal Calendar
              </h3>
              <p className="text-sm text-brand-black/60 mt-1">
                Explore what you eat each day. All meals are prepared fresh in Nagpur.
              </p>
            </div>

            {/* Week Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-brand-cream rounded-xl border border-brand-black/10 self-start">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors ${
                  activeTab === 'all'
                    ? 'bg-brand-white text-brand-black shadow-xs'
                    : 'text-brand-black/50 hover:text-brand-black'
                }`}
              >
                All 26 Days
              </button>
              {SUBSCRIPTION_WEEKS.map((w) => (
                <button
                  key={w.week}
                  onClick={() => setActiveTab(String(w.week))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors ${
                    activeTab === String(w.week)
                      ? 'bg-brand-white text-brand-black shadow-xs'
                      : 'text-brand-black/50 hover:text-brand-black'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Grid / Timeline Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSchedule.map((item) => (
              <div
                key={item.day}
                className="group bg-brand-cream/40 hover:bg-brand-white rounded-2xl p-4 border border-brand-black/8 hover:border-brand-black/20 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-brand-green/10 text-brand-green">
                      DAY {item.day < 10 ? `0${item.day}` : item.day}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-brand-black/40">
                      {item.type}
                    </span>
                  </div>
                  <h4 className="font-display text-base font-bold text-brand-black group-hover:text-brand-green transition-colors leading-snug">
                    {item.title}
                  </h4>
                </div>
                <div className="mt-3 pt-2.5 border-t border-brand-black/5 flex items-center justify-between text-[11px] text-brand-black/40">
                  <span>Week {item.week}</span>
                  <span className="group-hover:text-brand-green transition-colors">Clean Prep</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout banner */}
          <div className="mt-12 bg-brand-cream rounded-3xl p-6 sm:p-8 border border-brand-black/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-display text-xl font-bold text-brand-black">
                Ready to transform your daily food routine?
              </h4>
              <p className="text-xs sm:text-sm text-brand-black/60 mt-1 max-w-xl">
                Chat directly with Mr. Salad on WhatsApp to choose your start date, confirm current pricing, and customize for your diet.
              </p>
            </div>
            <button
              onClick={() => {
                setLeadForm((prev) => ({ ...prev, plan: '26-Day Wellness Plan' }));
                setIsModalOpen(true);
              }}
              className="px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-green text-white hover:bg-brand-dark transition-all shadow-sm shrink-0"
            >
              SUBSCRIBE NOW →
            </button>
          </div>
        </div>
      </div>

      {/* ── SUBSCRIPTION ENQUIRY MODAL (NO PAYMENT / NO CHECKOUT) ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-brand-black/10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-green font-bold">
                  Subscription Enquiry
                </span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-brand-black/5 hover:bg-brand-black/10 flex items-center justify-center text-brand-black text-sm"
                >
                  ✕
                </button>
              </div>

              <h3 className="font-display text-2xl font-black text-brand-black mb-2">
                Enquire via WhatsApp
              </h3>
              <p className="text-xs text-brand-black/60 mb-6">
                Tell us your preferences. We will connect you directly with the Mr. Salad studio in Bajaj Nagar to finalize your plan.
              </p>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-brand-cream/60 border border-brand-black/15 rounded-xl px-4 py-2.5 text-xs text-brand-black focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                    Selected Plan
                  </label>
                  <select
                    value={leadForm.plan}
                    onChange={(e) => setLeadForm({ ...leadForm, plan: e.target.value })}
                    className="w-full bg-brand-cream/60 border border-brand-black/15 rounded-xl px-4 py-2.5 text-xs text-brand-black focus:outline-none focus:border-brand-green"
                  >
                    <option value="26-Day Wellness Plan">26-Day Wellness Plan</option>
                    <option value="Weekly Plan (6 Days)">Weekly Plan (6 Days)</option>
                    <option value="Per Meal Trial">Per Meal Trial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                    Dietary Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLeadForm({ ...leadForm, dietPreference: 'Vegetarian' })}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border ${
                        leadForm.dietPreference === 'Vegetarian'
                          ? 'border-brand-green bg-brand-green/10 text-brand-green'
                          : 'border-brand-black/10 text-brand-black/60'
                      }`}
                    >
                      🌱 Pure Veg
                    </button>
                    <button
                      type="button"
                      onClick={() => setLeadForm({ ...leadForm, dietPreference: 'Egg-friendly' })}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border ${
                        leadForm.dietPreference === 'Egg-friendly'
                          ? 'border-brand-green bg-brand-green/10 text-brand-green'
                          : 'border-brand-black/10 text-brand-black/60'
                      }`}
                    >
                      🥚 Includes Egg
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                    Desired Start Date
                  </label>
                  <input
                    type="date"
                    value={leadForm.startDate}
                    onChange={(e) => setLeadForm({ ...leadForm, startDate: e.target.value })}
                    className="w-full bg-brand-cream/60 border border-brand-black/15 rounded-xl px-4 py-2.5 text-xs text-brand-black focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-black/70 mb-1">
                    Customization / Allergies (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={leadForm.notes}
                    onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                    placeholder="E.g. No onion, prefer high paneer..."
                    className="w-full bg-brand-cream/60 border border-brand-black/15 rounded-xl px-4 py-2.5 text-xs text-brand-black focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#25D366] text-white hover:bg-[#20BA5A] transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Chat on WhatsApp</span>
                    <span>↗</span>
                  </button>
                  <p className="text-[10px] text-center text-brand-black/40 mt-2">
                    No payment collected here. We will finalize your plan directly on WhatsApp.
                  </p>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
