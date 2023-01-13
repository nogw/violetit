import clsx from 'clsx';

type CardActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement | React.ReactElement[];
};

export const CardActions = ({ children, ...props }: CardActionsProps) => {
  return (
    <div className={clsx('flex', props.className)} {...props}>
      {children}
    </div>
  );
};
