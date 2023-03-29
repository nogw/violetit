import clsx from 'clsx';

type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
  color: string;
  label: string;
};

export const Tag = ({ color, label }: TagProps) => {
  const styles = {
    base: 'mr-1 h-min w-min rounded-full px-2 pb-0.5 text-sm font-bold text-neutral-900',
    effects: 'hover:brightness-125',
  };

  return (
    <span className={clsx(styles.base, styles.effects)} style={{ backgroundColor: color }}>
      {label}
    </span>
  );
};
