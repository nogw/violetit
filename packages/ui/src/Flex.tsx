import clsx from 'clsx';

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
};

export const Flex = ({ children, className, ...props }: FlexProps) => {
  return (
    <div className={clsx('flex', className)} {...props}>
      {children}
    </div>
  );
};
