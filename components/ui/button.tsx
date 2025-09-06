import React from 'react';

export function Button({ children, onClick, className, variant, size }: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: string;
  size?: string;
}) {
  // Basic styling for demonstration; variant prop can be used for outline vs primary
  const base = 'px-3 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClass = variant === 'outline'
    ? 'border border-gray-600 text-white bg-transparent hover:bg-gray-800'
    : 'bg-blue-600 text-white hover:bg-blue-500';
  return (
    <button onClick={onClick} className={`${base} ${variantClass} ${className ?? ''}`}>{children}</button>
  );
}
