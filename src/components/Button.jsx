import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for tailwind class merging */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = "px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2";

  const variants = {
    primary: "bg-brand-white text-brand-black hover:bg-brand-green hover:text-brand-white",
    secondary: "bg-transparent border border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black",
    dark: "bg-brand-black text-brand-white hover:bg-brand-green",
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
