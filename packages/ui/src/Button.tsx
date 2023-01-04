import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactElement | string;
};

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      className={clsx(
        'cursor-pointer bg-sky-700 hover:bg-blue-700',
        'flex-auto py-2 px-4 rounded',
        'text-white font-bold pointer',
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
