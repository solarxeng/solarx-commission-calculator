import React from 'react';

export function Input({ value, onChange, onBlur, type, inputMode, placeholder, className }: {
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
  inputMode?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      value={value as any}
      onChange={onChange}
      onBlur={onBlur}
      type={type ?? 'text'}
      inputMode={inputMode as any}
      placeholder={placeholder}
      className={`px-3 py-2 rounded-lg border border-gray-700 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${className ?? ''}`}
    />
  );
}
