import clsx from 'clsx';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[];
};

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={clsx('flex w-full p-2 py-3', 'rounded border border-solid border-gray-300 bg-white', className)}
      {...props}
    >
      {children}
    </div>
  );
};
