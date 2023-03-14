import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'cursor-pointer',
        'border border-blue-500',
        'rounded py-2 px-4',
        'text-sm font-bold text-blue-500',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
