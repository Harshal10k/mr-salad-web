/**
 * Centralized Brand Configuration for Mr. Salad — The Diet Studio
 * Edit all external links, contact details, and subscription pricing here.
 */

export const BRAND = {
  name: 'Mr. Salad',
  tagline: 'The Diet Studio',
  taglineSecondary: 'GOOD FOOD. GOOD ENERGY.',
  addressLine1: 'Bajaj Nagar',
  city: 'Nagpur',
  fullAddress: 'Bajaj Nagar, Nagpur, Maharashtra',
  phone: '+91 9158604768',
  phoneRaw: '919158604768',
  whatsappRaw: '919158604768',
  whatsappDisplay: '+91 9158604768',
  instagramHandle: 'mr_salad24',
  instagramUrl: 'https://www.instagram.com/mr_salad24/',
  mapsUrl: 'https://maps.google.com/?q=Mr+Salad+Bajaj+Nagar+Nagpur',
};

// External ordering platform links (Leave empty until confirmed)
export const ZOMATO_URL = '';
export const SWIGGY_URL = '';

/**
 * Subscription Pricing Placeholders
 * Actual subscription prices have not yet been provided by the brand.
 * Set numeric values when confirmed (e.g. 149, 849, 3299).
 * When null, the UI renders "PRICE TO BE CONFIRMED".
 */
export const SUBSCRIPTION_PRICING = {
  mealPrice: null,
  weeklyPrice: null,
  fullPlanPrice: null,
};

/**
 * Helper to generate pre-filled WhatsApp enquiry link for subscriptions or custom queries
 */
export function getWhatsAppEnquiryUrl(topic = 'subscription', extraDetails = '') {
  let message = `Hello Mr. Salad team! I am visiting your website and would like to enquire about your 26-Day Wellness Subscription. Please share details regarding the meal schedule, start dates, and pricing.`;
  
  if (topic === 'custom_salad') {
    message = `Hello Mr. Salad team! I would like to enquire about creating a custom salad box.`;
  } else if (extraDetails) {
    message += ` Details: ${extraDetails}`;
  }

  return `https://wa.me/${BRAND.whatsappRaw}?text=${encodeURIComponent(message)}`;
}
