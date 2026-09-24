import React from 'react';
import { BRAND } from '../config/brand';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative bg-brand-white text-brand-black py-20 md:py-28 border-t border-brand-black/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-green font-bold">
              Community & Feedback
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.93] text-brand-black uppercase mt-2">
              PEOPLE LOVE<br />THEIR FOOD.
            </h2>
          </div>
          <p className="text-sm text-brand-black/60 max-w-sm font-medium">
            We prioritize transparent food and authentic experiences in Nagpur.
          </p>
        </div>

        {/* Testimonials Placeholders Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Review placeholder */}
          <div className="bg-brand-cream/50 border border-dashed border-brand-black/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-4 text-brand-black/40 text-xs font-mono">
                <span>Google & Zomato Reviews</span>
              </div>
              <p className="text-sm sm:text-base text-brand-black/60 font-medium italic leading-relaxed">
                &ldquo;Real customer reviews will appear here.&rdquo;
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-brand-black/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-black/5 flex items-center justify-center font-mono text-xs text-brand-black/40">
                ★
              </div>
              <div>
                <div className="text-xs font-bold text-brand-black/70">Verified Customer</div>
                <div className="text-[10px] text-brand-black/40">Bajaj Nagar, Nagpur</div>
              </div>
            </div>
          </div>

          {/* Card 2: Review placeholder */}
          <div className="bg-brand-cream/50 border border-dashed border-brand-black/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-4 text-brand-black/40 text-xs font-mono">
                <span>Diet Studio Experience</span>
              </div>
              <p className="text-sm sm:text-base text-brand-black/60 font-medium italic leading-relaxed">
                &ldquo;Real customer reviews will appear here.&rdquo;
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-brand-black/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-black/5 flex items-center justify-center font-mono text-xs text-brand-black/40">
                ★
              </div>
              <div>
                <div className="text-xs font-bold text-brand-black/70">Subscription Member</div>
                <div className="text-[10px] text-brand-black/40">26-Day Wellness Plan</div>
              </div>
            </div>
          </div>

          {/* Card 3: Social proof & community invite */}
          <div className="bg-brand-cream rounded-3xl p-6 sm:p-8 border border-brand-black/10 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-bold uppercase tracking-wider mb-4">
                Share Your Meal
              </div>
              <h3 className="font-display text-xl font-bold text-brand-black mb-2">
                Tag Us On Instagram
              </h3>
              <p className="text-xs sm:text-sm text-brand-black/65 leading-relaxed">
                Enjoyed your bowl or salad? Share a photo and tag <strong>@{BRAND.instagramHandle}</strong> to get featured on our brand feed.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-brand-black/10">
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-green hover:text-brand-dark transition-colors"
              >
                Follow @{BRAND.instagramHandle} ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
