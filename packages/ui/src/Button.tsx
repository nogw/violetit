import clsx from 'clsx';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'neutral';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', ...props }, ref) => {
    const styles = {
      base: 'cursor-pointer rounded py-2 px-4 gap-1 flex items-center justify-center text-sm font-bold transition-colors',
      variant: {
        neutral: 'bg-transparent text-gray-500',
        primary: 'bg-blue-500 text-zinc-50',
        secondary: 'bg-transparent border border-blue-500 text-blue-500',
      },
      effects: {
        neutral: 'hover:bg-gray-200 active:bg-gray-300',
        primary: 'hover:bg-blue-700 active:bg-blue-900',
        secondary: 'hover:border-blue-800',
      },
    };

    return (
      <button ref={ref} className={clsx(styles.base, styles.variant[variant], styles.effects[variant])} {...props}>
        {children}
      </button>
    );
  },
);
