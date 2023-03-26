import React from 'react';

type ColorFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

export const ColorField = React.forwardRef<HTMLInputElement, ColorFieldProps>(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="color"
      className="block h-6 w-full cursor-pointer appearance-none rounded-md border-2 border-gray-300 bg-gray-100 focus:border-blue-500 focus:outline-none"
      {...props}
    />
  );
});
