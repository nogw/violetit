import clsx from 'clsx';

type CardContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement | React.ReactElement[];
};

export const CardContent = ({ children, ...props }: CardContentProps) => {
  return (
    <div className={clsx('flex my-0 mx-auto p-8', props.className)} {...props}>
      {children}
    </div>
  );
};
