import clsx from 'clsx';

type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
  color: string;
  label: string;
};

export const Tag = ({ color, label }: TagProps) => {
  return (
    <span
      className={clsx(
        'whitespace-nowrap text-sm font-bold text-neutral-900',
        'rounded-full hover:brightness-125',
        'mr-1 h-min w-min px-2 pb-0.5',
      )}
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
};
