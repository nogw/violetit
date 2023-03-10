import clsx from 'clsx';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = ({ children, className, ...props }: TextAreaProps) => {
  return (
    <textarea
      rows={6}
      className={clsx(
        'rounded border border-solid hover:border-sky-400',
        'text-sm outline-none	',
        'w-full px-2 py-2',
        className,
      )}
      {...props}
    />
  );
};
