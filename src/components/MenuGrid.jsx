import React from 'react';
import MenuCard from './MenuCard';

const MenuGrid = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
    {items.map((item) => (
      <MenuCard key={item.id} item={item} />
    ))}
  </div>
);

export default MenuGrid;
