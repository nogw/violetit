import clsx from 'clsx';

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  weight?: 'semibold' | 'bold' | 'extrabold';
};

export const Heading = ({ variant = 'h3', weight = 'semibold' }: HeadingProps) => {
  const styles = {
    variant: {
      h1: 'text-4xl md:text-5xl',
      h2: 'text-3xl md:text-4xl',
      h3: 'text-xl md:text-3xl',
      h4: 'text-lg md:text-xl',
      h5: 'text-base md:text-lg',
      h6: 'text-sm md:text-base',
    },
    weight: {
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
  };

  return <h1 className={clsx(styles.variant[variant], styles.weight[weight])} />;
};
