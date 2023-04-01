import clsx from 'clsx';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  isFullWith?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', isFullWith, ...props }, ref) => {
    const styles = {
      base: 'border cursor-pointer rounded font-bold inline-flex shrink-0 gap-1 items-center justify-center transition-colors',
      variant: {
        neutral: 'border-gray-100 bg-gray-100 text-gray-500 dark:bg-neutral-800 dark:text-white dark:border-gray-700',
        primary: 'border-blue-500 bg-blue-500 text-zinc-50',
        secondary: 'bg-transparent border-blue-500 text-blue-500',
      },
      effects: {
        neutral: 'hover:bg-gray-200 active:bg-gray-300',
        primary: 'hover:bg-blue-700 active:bg-blue-900',
        secondary: 'hover:border-blue-800',
      },
      size: {
        sm: 'px-1 py-0 text-sm',
        md: 'py-1 px-2 text-md',
        lg: 'py-2 px-4 text-lg',
      },
      isFullWith: 'w-full',
    };

    return (
      <button
        ref={ref}
        className={clsx(styles.base, styles.variant[variant], styles.effects[variant], styles.size[size], {
          [styles.isFullWith]: isFullWith,
        })}
        {...props}
      >
        {children}
      </button>
    );
  },
);
