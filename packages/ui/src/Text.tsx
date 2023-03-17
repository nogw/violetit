import clsx from 'clsx';

type TextProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'p1' | 'p2' | 'p3' | 'cap';
  weight?: 'normal' | 'medium' | 'semibold';
  underline?: boolean;
  uppercase?: boolean;
};

export const Text = ({ variant = 'p1', weight = 'normal', underline = false, uppercase = false }: TextProps) => {
  const styles = {
    variant: {
      p1: 'text-base leading-6',
      p2: 'text-lg leading-7',
      p3: 'text-xl leading-8',
      cap: 'text-sm leading-5',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
    underline: 'underline',
    uppercase: 'uppercase',
  };

  return (
    <span
      className={clsx(
        styles.variant[variant],
        styles.weight[weight],
        { [styles.underline]: underline },
        { [styles.uppercase]: uppercase },
      )}
    />
  );
};
