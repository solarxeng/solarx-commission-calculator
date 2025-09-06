import React from 'react';

export function Slider({ value, onValueChange, min, max, step }: {
  value: number[];
  onValueChange: (v: number[]) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      className="w-full"
    />
  );
}
