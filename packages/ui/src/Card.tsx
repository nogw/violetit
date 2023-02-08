import clsx from 'clsx';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement | React.ReactElement[];
};

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={clsx('flex p-2 w-full', 'rounded border border-solid border-gray-300 bg-white', className)}
      {...props}
    >
      {children}
    </div>
  );
};
