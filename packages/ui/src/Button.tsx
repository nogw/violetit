import clsx from 'clsx';
import React from 'react';
import { IconType } from 'react-icons';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'neutral';
  fullWidth?: boolean;
  startIcon?: IconType;
};

const styles = {
  variant: {
    neutral: {
      color: 'text-neutral-500 dark:text-neutral-200',
      bg: 'bg-neutral-100 dark:bg-neutral-800',
      border: 'border-neutral-200 dark:border-neutral-700',
      hover: 'hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-700',
    },
    primary: {
      color: 'text-zinc-50',
      bg: 'bg-blue-500',
      border: 'border-blue-500',
      hover: 'hover:bg-blue-700 active:bg-blue-900',
    },
    secondary: {
      color: 'text-blue-500',
      bg: 'bg-transparent',
      border: 'border-blue-500',
      hover: 'hover:border-blue-800 hover:bg-blue-800/10',
    },
  },
  size: {
    sm: 'px-1 py-0 text-sm',
    md: 'py-1 px-2 text-md',
    lg: 'py-2 px-4 text-lg',
  },
  fullWidth: 'w-full',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, size = 'md', variant = 'primary', startIcon: Icon, fullWidth, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'glow-0 inline-flex shrink-0 items-center justify-center transition-colors',
          'cursor-pointer gap-1 rounded border font-bold',
          styles.size[size],
          styles.variant[variant].color,
          styles.variant[variant].bg,
          styles.variant[variant].border,
          styles.variant[variant].hover,
          { [styles.fullWidth]: fullWidth },
          className,
        )}
        {...props}
      >
        {Icon && <Icon />}
        {children}
      </button>
    );
  },
);

export type { ButtonProps };
