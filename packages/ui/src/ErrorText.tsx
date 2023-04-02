import clsx from 'clsx';
import React from 'react';

interface ErrorTextProps {
  children: React.ReactNode;
}

export const ErrorText = React.forwardRef<HTMLDivElement, ErrorTextProps>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('rounded border-l-4 border-red-500', 'bg-red-100 text-red-700 dark:bg-red-100/10', 'my-4 p-2')}
      role="alert"
    >
      <p className="font-bold">Error</p>
      <p>{children}</p>
    </div>
  );
});
