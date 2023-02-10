import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactElement | string;
};

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'cursor-pointer',
        'border border-blue-500',
        'py-2 px-4 rounded',
        'font-bold text-sm text-blue-500',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
