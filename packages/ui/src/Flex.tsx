import clsx from 'clsx';
import React from 'react';

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
  direction?: 'row' | 'col' | 'colReverse' | 'rowReverse';
  fullHeight?: boolean;
  fullWidth?: boolean;
};

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ direction = 'row', fullHeight, fullWidth, children, className, ...props }, ref) => {
    const styles = {
      direction: {
        row: 'flex-row',
        col: 'flex-col',
        rowReverse: 'flex-row-reverse',
        colReverse: 'flex-col-reverse',
      },
      fullHeight: 'h-full',
      fullWidth: 'w-full',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'flex',
          styles.direction[direction],
          { [styles.fullWidth]: fullWidth },
          { [styles.fullHeight]: fullHeight },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
