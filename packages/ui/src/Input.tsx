import clsx from 'clsx';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ children, className, ...props }: InputProps) => {
  return (
    <input
      className={clsx(
        'rounded border border-solid hover:border-sky-400',
        'text-sm outline-none',
        'w-full px-2 py-2',
        className,
      )}
      {...props}
    />
  );
};
