import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MenuHeader from '../components/MenuHeader';
import ZomatoCTA from '../components/ZomatoCTA';
import CategoryNav from '../components/CategoryNav';
import MenuSearch from '../components/MenuSearch';
import MenuGrid from '../components/MenuGrid';
import EmptyState from '../components/EmptyState';
import useMenu from '../data/useMenu';

function MenuPage() {
  useEffect(() => {
    document.title = 'Mr. Salad — The Menu';
  }, []);

  const { items, categories } = useMenu();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [activeCat, setActiveCat] = useState(searchParams.get('cat') || 'ALL');

  // sync URL query params with state
  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (activeCat && activeCat !== 'ALL') params.cat = activeCat;
    setSearchParams(params, { replace: true });
  }, [search, activeCat, setSearchParams]);

  const filtered = items.filter(item => {
    const matchesCat = activeCat === 'ALL' || item.category === activeCat;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header + primary CTA */}
        <MenuHeader />
        <div className="flex justify-center mb-10">
          <ZomatoCTA />
        </div>

        {/* Sticky category nav */}
        <CategoryNav
          categories={categories}
          active={activeCat}
          onSelect={(cat) => { setActiveCat(cat); setSearch(''); }}
        />

        {/* Search */}
        <div className="mt-5 mb-8">
          <MenuSearch value={search} onChange={setSearch} />
        </div>

        {/* Results count */}
        {(search || activeCat !== 'ALL') && filtered.length > 0 && (
          <p className="text-xs text-brand-black/35 tracking-widest uppercase mb-6">
            {filtered.length} item{filtered.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Grid or Empty */}
        {filtered.length > 0 ? (
          <MenuGrid items={filtered} />
        ) : (
          <EmptyState />
        )}

        {/* Bottom Zomato CTA */}
        {filtered.length > 0 && (
          <div className="flex justify-center pt-16 pb-12">
            <ZomatoCTA />
          </div>
        )}
      </div>
    </main>
  );
}

export default MenuPage;

