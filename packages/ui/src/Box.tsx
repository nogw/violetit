import clsx from 'clsx';

type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactElement | React.ReactElement[];
};

export const Box = ({ children, className, ...props }: BoxProps) => {
  return (
    <div className={clsx('shrink-0 grow-0', className)} {...props}>
      {children}
    </div>
  );
};
