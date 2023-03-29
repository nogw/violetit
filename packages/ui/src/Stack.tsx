import clsx from 'clsx';
import React from 'react';

type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode | React.ReactNode[];
  gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6';
  direction?: 'row' | 'col';
  divide?: boolean;
};

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ direction = 'row', divide = false, gap = '0', children, className, ...props }, ref) => {
    const styles = {
      base: 'flex',
      direction: {
        row: 'flex-row',
        col: 'flex-col',
      },
      divide: 'divide-y',
      gap: {
        '0': 'gap-0',
        '1': 'gap-1',
        '2': 'gap-2',
        '3': 'gap-3',
        '4': 'gap-4',
        '5': 'gap-5',
        '6': 'gap-6',
      },
    };

    return (
      <div
        ref={ref}
        className={clsx(styles.base, styles.direction[direction], styles.gap[gap], {
          [styles.divide]: divide,
        })}
        {...props}
      >
        {children}
      </div>
    );
  },
);
