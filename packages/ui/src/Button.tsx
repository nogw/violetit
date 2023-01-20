import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactElement | string;
};

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'cursor-pointer bg-sky-700 hover:bg-blue-700',
        'flex-auto py-2 px-4 rounded',
        'text-white text-sm font-bold pointer',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
