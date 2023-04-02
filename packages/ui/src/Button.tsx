import clsx from 'clsx';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', isFullWidth, ...props }, ref) => {
    const styles = {
      variant: {
        neutral: [
          'text-gray-500 dark:text-slate-300',
          'bg-gray-100 dark:bg-neutral-800',
          'border-gray-100 dark:border-neutral-700',
        ],
        primary: 'border-blue-500 bg-blue-500 text-zinc-50',
        secondary: 'bg-transparent border-blue-500 text-blue-500',
      },
      effects: {
        neutral: 'hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-neutral-700',
        primary: 'hover:bg-blue-700 active:bg-blue-900',
        secondary: 'hover:border-blue-800 hover:bg-blue-800/10',
      },
      size: {
        sm: 'px-1 py-0 text-sm',
        md: 'py-1 px-2 text-md',
        lg: 'py-2 px-4 text-lg',
      },
      isFullWidth: 'w-full',
    };

    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex shrink-0 items-center justify-center transition-colors',
          'cursor-pointer gap-1 rounded border font-bold',
          styles.variant[variant],
          styles.effects[variant],
          styles.size[size],
          {
            [styles.isFullWidth]: isFullWidth,
          },
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
