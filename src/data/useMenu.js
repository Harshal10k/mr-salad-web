import menuData from './menu.json';

const useMenu = () => {
  const { items, categories, addOns } = menuData;
  return {
    items,
    categories: ['ALL', ...categories],
    addOns,
  };
};

export default useMenu;
