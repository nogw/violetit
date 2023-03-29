import clsx from 'clsx';
import React from 'react';

interface InfoTextProps {
  title?: string;
  children: React.ReactNode;
}

export const InfoText = React.forwardRef<HTMLDivElement, InfoTextProps>(({ title, children }, ref) => {
  const style = {
    base: 'mt-4 rounded border-l-4 border-blue-500 bg-blue-100 px-3 py-1 text-blue-700',
  };

  return (
    <div ref={ref} className={clsx(style.base)} role="alert">
      <p className="font-bold">{title ? title : 'Info'}</p>
      <p>{children}</p>
    </div>
  );
});
