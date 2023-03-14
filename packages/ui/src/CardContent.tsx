import clsx from 'clsx';

type CardContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
};

export const CardContent = ({ children, className, ...props }: CardContentProps) => {
  return (
    <div className={clsx('flex flex-col px-2', className)} {...props}>
      {children}
    </div>
  );
};
