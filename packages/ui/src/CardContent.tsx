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
    <div className={clsx('flex my-0 mx-auto p-8', className)} {...props}>
      {children}
    </div>
  );
};
