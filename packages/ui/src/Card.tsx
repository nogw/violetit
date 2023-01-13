import clsx from 'clsx';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement | React.ReactElement[];
};

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div className={clsx('flex', className)} {...props}>
      {children}
    </div>
  );
};
