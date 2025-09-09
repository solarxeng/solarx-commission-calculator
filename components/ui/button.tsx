import React from 'react';


type Props = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md';
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
}: Props) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-xl2 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const sized = size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm';

  const variantClass =
    variant === 'outline'
      ? 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:ring-brand-accent'
      : 'bg-brand-primary text-white hover:bg-brand-primaryDark focus:ring-brand-accent';

  return (
    <button type={type} onClick={onClick} className={`${base} ${sized} ${variantClass} ${className}`}>
      {children}
    </button>
  );
}
