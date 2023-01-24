import clsx from 'clsx';

type CardContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement | React.ReactElement[];
};

export const CardContent = ({
  children,
  className,
  ...props
}: CardContentProps) => {
  return (
    <div className={clsx('flex flex-col p-2', className)} {...props}>
      {children}
    </div>
  );
};
