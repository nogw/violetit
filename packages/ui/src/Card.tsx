import clsx from 'clsx';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement | React.ReactElement[];
};

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={clsx(
        'rounded border border-solid border-gray-300',
        'flex p-2 my-3 bg-white',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
