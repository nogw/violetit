import clsx from 'clsx';
import React from 'react';

interface InfoTextProps {
  title?: string;
  children: React.ReactNode;
}

export const InfoText = React.forwardRef<HTMLDivElement, InfoTextProps>(({ title, children }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'rounded border-l-4 border-blue-500',
        'bg-blue-100 text-blue-700 dark:bg-blue-800/10',
        'my-2 p-2',
      )}
      role="alert"
    >
      <p className="font-bold">{title ? title : 'Info'}</p>
      <p>{children}</p>
    </div>
  );
});
