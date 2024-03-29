import clsx from 'clsx';

type TextProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'p1' | 'p2' | 'p3' | 'p4' | 'p5';
  weight?: 'normal' | 'medium' | 'semibold';
  color?: 'primary' | 'secondary';
  underline?: boolean;
  uppercase?: boolean;
  clamp?: boolean;
  children: React.ReactNode;
};

export const Text = ({
  variant = 'p1',
  weight = 'normal',
  color = 'primary',
  underline,
  uppercase,
  clamp,
  className,
  children,
  ...props
}: TextProps) => {
  const styles = {
    variant: {
      p1: 'text-base leading-6',
      p2: 'text-lg leading-7',
      p3: 'text-xl leading-8',
      p4: 'text-sm leading-5',
      p5: 'text-xs leading-4',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
    color: {
      primary: 'text-black dark:text-white',
      secondary: 'text-gray-500 dark:text-neutral-400',
    },
    underline: 'underline',
    uppercase: 'uppercase',
    clamp: 'line-clamp-3 break-words',
  };

  return (
    <span
      className={clsx(
        styles.variant[variant],
        styles.weight[weight],
        styles.color[color],
        { [styles.underline]: underline },
        { [styles.uppercase]: uppercase },
        { [styles.clamp]: clamp },
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
