import clsx from 'clsx';

type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactElement | React.ReactElement[];
};

export const Box = ({ children, className, ...props }: BoxProps) => {
  return (
    <div className={clsx('grow-0 shrink-0', className)} {...props}>
      {children}
    </div>
  );
};
