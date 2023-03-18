import clsx from 'clsx';
import React from 'react';

interface ErrorTextProps {
  children: React.ReactNode;
}

export const ErrorText = React.forwardRef<HTMLDivElement, ErrorTextProps>(({ children }, ref) => {
  const style = {
    base: 'mt-4 rounded border-l-4 border-red-500 bg-red-100 px-3 py-1 text-red-700',
  };

  return (
    <div ref={ref} className={clsx(style.base)} role="alert">
      <p className="font-bold">Error</p>
      <p>{children}</p>
    </div>
  );
});
