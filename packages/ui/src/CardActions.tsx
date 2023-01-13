import clsx from 'clsx';

type CardActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement | React.ReactElement[];
};

export const CardActions = ({
  children,
  className,
  ...props
}: CardActionsProps) => {
  return (
    <div className={clsx('flex', className)} {...props}>
      {children}
    </div>
  );
};
