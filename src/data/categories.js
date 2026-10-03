import menuData from './menu.json';

/**
 * Editorial Category definitions aligned with the homepage structure:
 * - Salads
 * - Bowls
 * - Smoothie Bowls (mapped from menu.json 'Bowls' smoothies without altering source data)
 * - Between Bread
 * - Snacks
 * - Juices (including booster shots)
 * - Create Your Salad (dedicated custom salad builder information)
 */

// Helper to provide tasteful, non-fabricated descriptions based on item name and category
export function getItemDescription(item) {
  if (item.description) return item.description;

  const name = item.name.toLowerCase();
  if (item.category === 'Salads') {
    if (name.includes('sprout')) return 'Fresh sprout-based salad with clean seasoning.';
    if (name.includes('paneer')) return 'Grilled cottage cheese tossed with garden greens.';
    if (name.includes('protein')) return 'High-protein whole food salad designed for active living.';
    if (name.includes('chana') || name.includes('chickpea')) return 'Tender legumes tossed with crunchy fresh veggies.';
    if (name.includes('egg')) return 'Protein-rich boiled eggs on crisp lettuce and vegetables.';
    if (name.includes('fruit')) return 'Seasonal fresh fruits with a citrus zest.';
    return 'Crisp seasonal greens and balanced whole foods.';
  }
  if (item.category === 'Bowls') {
    return 'Thick, chilled nutrient-rich smoothie bowl topped with seeds.';
  }
  if (item.category === 'Juices') {
    return 'Freshly pressed cold juice with zero added refined sugar.';
  }
  if (item.category === 'Get Going') {
    return 'Concentrated cold-pressed vitality shot.';
  }
  if (item.category === 'Between Bread') {
    return 'Whole-grain toast with comforting, high-protein fillings.';
  }
  if (item.category === 'Snacks') {
    return 'Air-fried or steamed home-style wholesome bite.';
  }
  return 'Prepared fresh with wholesome ingredients.';
}

const CATEGORY_CONFIG = [
  {
    id: 'salads',
    number: '01',
    name: 'SALADS',
    rawName: 'Salads',
    tagline: 'The Greens & Proteins',
    description: 'Fresh, filling and made for everyday nutrition.',
    cta: 'Explore Salads',
    image: '/images/categories/salads.jpg',
    menuCat: 'Salads',
    filter: (item) => item.category.toLowerCase() === 'salads',
  },
  {
    id: 'bowls',
    number: '02',
    name: 'BOWLS',
    rawName: 'Bowls',
    tagline: 'Warm Grains & Wholesome Bases',
    description: 'Wholesome balanced rice and grain bowls.',
    cta: 'Explore Bowls',
    image: '/images/categories/bowls.jpg',
    menuCat: 'Bowls',
    filter: (item) => item.category.toLowerCase() === 'bowls' && !item.name.toLowerCase().includes('smoothie'),
  },
  {
    id: 'smoothie-bowls',
    number: '03',
    name: 'SMOOTHIE BOWLS',
    rawName: 'Smoothie Bowls',
    tagline: 'Superfood & Fruit Purees',
    description: 'Thick nutrient-dense smoothie bowls crafted with whole fruits.',
    cta: 'Explore Smoothie Bowls',
    image: '/images/categories/bowls.jpg',
    menuCat: 'Bowls',
    filter: (item) => item.category.toLowerCase() === 'bowls' && item.name.toLowerCase().includes('smoothie'),
  },
  {
    id: 'between-bread',
    number: '04',
    name: 'BETWEEN BREAD',
    rawName: 'Between Bread',
    tagline: 'Warm Artisanal Toasts',
    description: 'Whole-grain toasts and warm, satisfying high-protein fillings.',
    cta: 'Explore Between Bread',
    image: '/images/categories/between-bread.jpg',
    menuCat: 'Between Bread',
    filter: (item) => item.category.toLowerCase() === 'between bread',
  },
  {
    id: 'snacks',
    number: '05',
    name: 'SNACKS',
    rawName: 'Snacks',
    tagline: 'Clean Light Bites',
    description: 'Air-fried, steamed, and protein-packed home-style snacks.',
    cta: 'Explore Snacks',
    image: '/images/categories/snacks.jpg',
    menuCat: 'Snacks',
    filter: (item) => item.category.toLowerCase() === 'snacks',
  },
  {
    id: 'juices',
    number: '06',
    name: 'JUICES',
    rawName: 'Juices',
    tagline: 'Cold-Pressed Vitality',
    description: 'Fresh raw juices and booster shots with zero added sugar.',
    cta: 'Explore Juices',
    image: '/images/categories/juices.jpg',
    menuCat: 'Juices',
    filter: (item) => item.category.toLowerCase() === 'juices' || item.category.toLowerCase() === 'get going',
  },
];

export const categories = CATEGORY_CONFIG.map((cat) => {
  const items = menuData.items
    .filter(cat.filter)
    .map((item) => ({
      ...item,
      description: item.description || getItemDescription(item),
    }));

  return {
    id: cat.id,
    number: cat.number,
    name: cat.name,
    rawName: cat.rawName,
    tagline: cat.tagline,
    description: cat.description,
    cta: cat.cta,
    image: cat.image,
    menuCat: cat.menuCat,
    items,
    totalCount: items.length,
    sampleItemNames: items.slice(0, 4).map((i) => i.name),
  };
});

export const CREATE_YOUR_SALAD_DATA = {
  id: 'create-your-salad',
  number: '07',
  name: 'CREATE YOUR SALAD',
  tagline: 'Custom Plate Builder',
  subtitle: 'Start with your base. Choose your protein. Add your vegetables.',
  note: 'Pricing reference based on studio menu — confirm current pricing on order enquiry.',
  base: {
    name: 'Base Salad Bowl',
    price: 70,
    unit: 'base',
    description: 'Fresh mixed crisp greens & house dressing base',
  },
  proteins: {
    price: 40,
    unit: 'per choice',
    items: [
      { name: 'Paneer', description: 'Fresh cottage cheese' },
      { name: 'Chana', description: 'Boiled black gram' },
      { name: 'Soya Chunks', description: 'High-protein soya chunks' },
      { name: 'Sprouts', description: 'Mixed germinated sprouts' },
      { name: 'Egg', description: 'Farm fresh boiled egg', nonVeg: true },
      { name: 'Chickpea', description: 'Tender kabuli chana' },
      { name: 'Cheese', description: 'Diced savory cheese' },
    ],
  },
  veggies: {
    price: 30,
    unit: 'per choice',
    items: [
      'Cucumber',
      'Carrot',
      'Capsicum',
      'Onion',
      'Broccoli',
      'Bell Pepper',
      'Mushroom',
      'Babycorn',
      'Lettuce',
      'Iceberg',
      'Sweet Corn',
    ],
  },
};

export default categories;
