import clsx from 'clsx';
import React from 'react';

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
  direction?: 'row' | 'col' | 'colReverse' | 'rowReverse';
  isFullHeight?: boolean;
  isFullWidth?: boolean;
};

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ direction = 'row', isFullHeight, isFullWidth, children, className, ...props }, ref) => {
    const styles = {
      direction: {
        row: 'flex-row',
        col: 'flex-col',
        rowReverse: 'flex-row-reverse',
        colReverse: 'flex-col-reverse',
      },
      isFullHeight: 'h-full',
      isFullWidth: 'w-full',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'flex',
          styles.direction[direction],
          {
            [styles.isFullWidth]: isFullWidth,
          },
          {
            [styles.isFullWidth]: isFullWidth,
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
