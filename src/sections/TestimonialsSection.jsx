import React, { useState, useEffect } from 'react';
import { BRAND } from '../config/brand';

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchReviews() {
      try {
        const res = await fetch('/api/reviews');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setReviews(data);
          } else {
            setFetchError(true);
          }
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  const renderStars = (rating) => {
    const total = Math.max(1, Math.min(5, Math.round(Number(rating) || 5)));
    return (
      <div className="flex items-center gap-1 text-amber-500 text-sm">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < total ? 'text-amber-500' : 'text-brand-black/20'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  // Format relative time if ISO string or pass through
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    try {
      const date = new Date(timeStr);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
      }
    } catch {
      // fallback
    }
    return timeStr;
  };

  return (
    <section id="testimonials" className="relative bg-brand-cream text-brand-black py-20 md:py-28 border-t border-brand-black/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-12 md:mb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-sans text-xs uppercase tracking-widest text-brand-green font-bold">
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
      </div>

      {/* Reviews Marquee Area (Hidden gracefully if fetch fails or no reviews) */}
      {!loading && !fetchError && reviews.length > 0 && (
        <div className="relative w-full mb-14 overflow-hidden">
          {/* Gradient fade edges for smooth loop aesthetics */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-brand-cream to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-brand-cream to-transparent z-10" />

          {/* Marquee Track: duplicated set for continuous seamless loop */}
          <div className="animate-marquee pause-hover flex gap-6 px-4">
            {[...reviews, ...reviews].map((rev, index) => (
              <div
                key={`${rev.id || index}-${index}`}
                className="w-[300px] sm:w-[350px] shrink-0 bg-brand-white border border-brand-black/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-brand-green/30 transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    {renderStars(rev.starRating)}
                    <span className="text-[11px] font-sans text-brand-black/40">
                      {formatTime(rev.relativeTime)}
                    </span>
                  </div>
                  <p className="text-sm text-brand-black/80 font-medium leading-relaxed line-clamp-4">
                    &ldquo;{rev.comment || 'Amazing fresh food and refreshing bowls! Highly recommended.'}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-brand-black/10 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center font-bold text-xs uppercase">
                    {rev.name ? rev.name.charAt(0) : 'G'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-black/90">
                      {rev.name || 'Google Reviewer'}
                    </div>
                    <div className="text-[10px] text-brand-black/45 flex items-center gap-1 font-sans">
                      <span>Verified Google Review</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Static Container: Tag Us On Instagram */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="bg-brand-white rounded-3xl p-6 sm:p-8 border border-brand-black/10 flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-4xl mx-auto shadow-sm">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-[10px] font-bold uppercase tracking-wider mb-3">
              Share Your Meal
            </div>
            <h3 className="font-display text-2xl font-bold text-brand-black mb-2">
              Tag Us On Instagram
            </h3>
            <p className="text-xs sm:text-sm text-brand-black/65 leading-relaxed max-w-xl">
              Enjoyed your bowl or salad? Share a photo and tag <strong>@{BRAND.instagramHandle}</strong> to get featured on our brand feed.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-green text-brand-cream hover:bg-brand-dark text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              Follow @{BRAND.instagramHandle} ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

