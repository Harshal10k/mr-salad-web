import menuData from './menu.json';

/**
 * Editorial Category definitions derived directly from menu.json
 * Source of truth: menuData.categories and menuData.items
 */

const CATEGORY_METADATA = {
  'Salads': {
    number: '01',
    id: 'salads',
    name: 'SALADS',
    tagline: 'The Greens & Proteins',
    description: 'Fresh, filling and made for everyday eating.',
    cta: 'EXPLORE SALADS',
    fallbackImage: '/images/categories/salads.jpg',
  },
  'Bowls': {
    number: '02',
    id: 'bowls',
    name: 'BOWLS',
    tagline: 'Smoothie & Superfood Bowls',
    description: 'Nutrient-dense smoothie bowls crafted with pure whole foods.',
    cta: 'EXPLORE BOWLS',
    fallbackImage: '/images/categories/bowls.jpg',
  },
  'Juices': {
    number: '03',
    id: 'juices',
    name: 'JUICES',
    tagline: 'Cold-Pressed Vitality',
    description: 'Freshly pressed raw juices packed with micronutrients and zero added sugar.',
    cta: 'EXPLORE JUICES',
    fallbackImage: '/images/categories/juices.jpg',
  },
  'Snacks': {
    number: '04',
    id: 'snacks',
    name: 'SNACKS',
    tagline: 'Clean Light Bites',
    description: 'Light, wholesome and protein-packed bites to sustain steady energy.',
    cta: 'EXPLORE SNACKS',
    fallbackImage: '/images/categories/snacks.jpg',
  },
  'Between Bread': {
    number: '05',
    id: 'between-bread',
    name: 'BETWEEN BREAD',
    tagline: 'Warm Artisanal Toasts',
    description: 'Hearty whole-grain toasts and warm, satisfying high-protein fillings.',
    cta: 'EXPLORE BETWEEN BREAD',
    fallbackImage: '/images/categories/between-bread.jpg',
  },
  'Get Going': {
    number: '06',
    id: 'get-going',
    name: 'GET GOING',
    tagline: 'Concentrated Wellness Shots',
    description: 'Potent botanical booster shots crafted for immediate focus and stamina.',
    cta: 'EXPLORE GET GOING',
    fallbackImage: '/images/categories/get-going.jpg',
  },
};

export const categories = menuData.categories.map((rawName) => {
  const meta = CATEGORY_METADATA[rawName] || {
    number: '00',
    id: rawName.toLowerCase().replace(/\s+/g, '-'),
    name: rawName.toUpperCase(),
    tagline: 'Menu Collection',
    description: 'Carefully prepared whole food meals.',
    cta: `EXPLORE ${rawName.toUpperCase()}`,
    fallbackImage: '/images/categories/salads.jpg',
  };

  const categoryItems = menuData.items.filter(
    (item) => item.category.toLowerCase() === rawName.toLowerCase()
  );

  return {
    id: meta.id,
    number: meta.number,
    name: meta.name,
    rawName: rawName,
    tagline: meta.tagline,
    description: meta.description,
    cta: meta.cta,
    image: meta.fallbackImage,
    items: categoryItems,
    sampleItemNames: categoryItems.slice(0, 5).map((i) => i.name),
    totalCount: categoryItems.length,
  };
});

export default categories;
