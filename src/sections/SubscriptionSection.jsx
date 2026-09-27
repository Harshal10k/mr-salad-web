import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SUBSCRIPTION_PRICING, getWhatsAppEnquiryUrl } from '../config/brand';
import { SUBSCRIPTION_SCHEDULE } from '../data/subscriptionData';

export default function SubscriptionSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    plan: '26-Day Wellness Plan',
    dietPreference: 'Vegetarian',
    startDate: '',
    notes: '',
  });

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
        {/* ── 2-COLUMN HEADER: TEXT ON LEFT, 26-DAY PLAN CARD ON RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 md:mb-20">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-7">
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
            <p className="mt-5 text-base sm:text-lg text-brand-black/75 leading-relaxed font-medium max-w-xl">
              A disciplined, protein-conscious whole food plan with a unique meal designed for every single day. Prepared fresh in Bajaj Nagar, Nagpur with zero deep frying.
            </p>

            {/* Quick value badges */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-cream border border-brand-black/10 text-xs font-semibold text-brand-black/80">
                <span className="text-brand-green font-bold">✓</span> 26 Days Rotating Menu
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-cream border border-brand-black/10 text-xs font-semibold text-brand-black/80">
                <span className="text-brand-green font-bold">✓</span> High Protein
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-cream border border-brand-black/10 text-xs font-semibold text-brand-black/80">
                <span className="text-brand-green font-bold">✓</span> Nagpur Local Prep
              </span>
            </div>
          </div>

          {/* Right Column: 26-Day Plan Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-brand-green text-white rounded-3xl p-7 sm:p-9 shadow-2xl flex flex-col justify-between overflow-hidden border border-brand-green/20">
              <div className="absolute -right-12 -top-12 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-white/70">
                    FULL PROTOCOL
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                    Complete Habit
                  </span>
                </div>
                <h3 className="font-display text-3xl font-black text-white mb-1.5 tracking-tight">
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
                    <div className="inline-block px-3.5 py-1.5 rounded-lg bg-white/15 border border-white/25 text-xs font-mono font-bold text-white tracking-wide">
                      PRICE TO BE CONFIRMED
                    </div>
                  )}
                </div>
                <ul className="space-y-3 text-xs sm:text-[13px] text-white/85 mb-8">
                  <li className="flex items-start gap-2.5">
                    <span className="text-white font-bold leading-tight">✓</span>
                    <span>26 Different meals — zero repetition</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-white font-bold leading-tight">✓</span>
                    <span>High-protein recipes designed for steady energy</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-white font-bold leading-tight">✓</span>
                    <span>Personalized dietary preferences (Veg/Egg)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-white font-bold leading-tight">✓</span>
                    <span>Dedicated WhatsApp concierge & delivery updates</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  setLeadForm((prev) => ({ ...prev, plan: '26-Day Wellness Plan' }));
                  setIsModalOpen(true);
                }}
                className="w-full py-4 rounded-full text-xs font-bold tracking-wider uppercase bg-white text-brand-green hover:bg-brand-cream transition-all shadow-md text-center hover:scale-[1.02] cursor-pointer"
              >
                SUBSCRIBE NOW →
              </button>
            </div>
          </div>
        </div>
        {/* ── 26-DAY MEAL CALENDAR ── */}
        <div className="mt-16 pt-12 border-t border-brand-black/10">
          <div className="mb-8">
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

          {/* Two-Column Simple Bulleted Day List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {[SUBSCRIPTION_SCHEDULE.slice(0, 13), SUBSCRIPTION_SCHEDULE.slice(13)].map((columnMeals, colIdx) => (
              <ul
                key={colIdx}
                className="bg-brand-cream/35 border border-brand-black/10 rounded-2xl divide-y divide-brand-black/8 overflow-hidden shadow-xs"
              >
                {columnMeals.map((item) => {
                  const dayStr = item.day < 10 ? `0${item.day}` : item.day;
                  return (
                    <li
                      key={item.day}
                      className="flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5 sm:py-3 hover:bg-brand-white/80 transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-brand-green shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="text-xs sm:text-sm font-medium text-brand-black truncate">
                          <span className="font-mono font-bold text-brand-black">Day {dayStr}</span>
                          <span className="text-brand-black/40 mx-2">—</span>
                          <span className="text-brand-black/90 group-hover:text-brand-green transition-colors">
                            {item.title}
                          </span>
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-brand-black/45 bg-brand-white/80 border border-brand-black/10 px-2.5 py-0.5 rounded-full shrink-0">
                        {item.type}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>

          {/* Bottom Callout banner */}
          <div className="mt-12 bg-brand-black text-white rounded-3xl p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden relative">
            <div className="absolute -right-8 -bottom-8 w-56 h-56 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-green font-bold">Start Today</span>
              <h4 className="font-display text-2xl sm:text-3xl font-black text-white mt-1 leading-tight">
                Ready to transform your daily food routine?
              </h4>
              <p className="text-xs sm:text-sm text-white/55 mt-2 max-w-xl leading-relaxed">
                Chat directly with Mr. Salad on WhatsApp to choose your start date, confirm current pricing, and customize for your diet.
              </p>
            </div>
            <button
              onClick={() => {
                setLeadForm((prev) => ({ ...prev, plan: '26-Day Wellness Plan' }));
                setIsModalOpen(true);
              }}
              className="relative z-10 px-8 py-4 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-green text-white hover:bg-white hover:text-brand-green transition-all shadow-lg shrink-0 cursor-pointer"
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
