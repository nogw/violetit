import clsx from 'clsx';
import React from 'react';

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
  size?: '1' | '2' | '3' | '4';
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, size = '4', className, ...props }, ref) => {
    const styles = {
      size: {
        '1': 'min-w-430 max-w-430',
        '2': 'min-w-715 max-w-715',
        '3': 'min-w-1145 max-w-1145',
        '4': 'max-w-none',
      },
    };

    return (
      <div ref={ref} className={clsx('m-auto box-border flex-shrink-0', styles.size[size], className)} {...props}>
        {children}
      </div>
    );
  },
);

export { Container };
