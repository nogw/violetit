import { Button, ButtonProps } from '@violetit/ui/src/Button';
import Link from 'next/link';

type LinkButtonProps = ButtonProps & {
  href: string;
};

export const LinkButton = ({ children, href, ...props }: LinkButtonProps) => {
  return (
    <Link href={href} passHref>
      <Button {...props} role="link">
        {children}
      </Button>
    </Link>
  );
};
