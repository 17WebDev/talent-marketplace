import React, { useState } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step: number;
}

export const Slider: React.FC<SliderProps> = ({ min, max, step }) => {
  const [value, setValue] = useState(min);

  return (
    <div className="w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="mt-2 text-sm text-gray-600">
        ${(value / 1000).toFixed(0)}k - ${(max / 1000).toFixed(0)}k
      </div>
    </div>
  );
};