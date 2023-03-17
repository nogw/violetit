import clsx from 'clsx';
import React from 'react';

interface ErrorTextProps {
  children: React.ReactNode;
}

export const ErrorText = React.forwardRef<HTMLDivElement, ErrorTextProps>(({ children }, ref) => (
  <div
    ref={ref}
    className={clsx('border-l-4 border-red-500 bg-red-100', 'mt-4 rounded px-3 py-1', 'text-red-700')}
    role="alert"
  >
    <p className="font-bold">Error</p>
    <p>{children}</p>
  </div>
));
