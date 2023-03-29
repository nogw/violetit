import clsx from 'clsx';
import React from 'react';

type LabelProps = React.InputHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
};

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ children, ...props }, ref) => {
  const styles = {
    base: 'text-sm mb-1 font-bold text-gray-500',
  };

  return (
    <label className={clsx(styles.base)} {...props} ref={ref}>
      {children}
    </label>
  );
});
