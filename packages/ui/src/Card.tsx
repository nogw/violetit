import clsx from 'clsx';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement | React.ReactElement[];
};

export const Card = ({ children, ...props }: CardProps) => {
  return (
    <div className={clsx('flex', props.className)} {...props}>
      {children}
    </div>
  );
};
