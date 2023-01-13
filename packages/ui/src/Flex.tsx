import clsx from 'clsx';

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactElement | React.ReactElement[];
};

export const Flex = ({ children, ...props }: FlexProps) => {
  return (
    <div className={clsx('flex', props.className)} {...props}>
      {children}
    </div>
  );
};
