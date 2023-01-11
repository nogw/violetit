import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactElement | string;
};

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        'cursor-pointer bg-sky-700 hover:bg-blue-700',
        'flex-auto py-2 px-4 rounded',
        'text-white font-bold pointer',
      )}
      {...props}
    >
      {children}
    </button>
  );
};
