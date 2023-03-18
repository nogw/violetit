import clsx from 'clsx';
import React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ children, className, ...props }, ref) => {
  const styles = {
    base: 'flex w-full p-2 rounded border border-solid border-gray-300 bg-white',
  };

  return (
    <div ref={ref} className={clsx(styles.base, className)} {...props}>
      {children}
    </div>
  );
});
