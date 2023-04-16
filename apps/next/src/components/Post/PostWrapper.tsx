import { Card } from '@violetit/ui';

import { useRouter } from 'next/router';
import clsx from 'clsx';

type PostWrapperProps = {
  href?: string;
  children: React.ReactElement | React.ReactElement[];
};

export const PostWrapper = ({ href, children }: PostWrapperProps) => {
  const router = useRouter();
  // this function prevents navigation when the user clicks on a link or a button within the child component.
  // this is necessary because wrapping the child component with an <a> tag may cause some issues
  const handleRedirect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickedElement = event.target as HTMLElement;
    if (
      clickedElement.tagName !== 'A' &&
      clickedElement.tagName !== 'BUTTON' &&
      !clickedElement.closest('a') &&
      !clickedElement.closest('button')
    ) {
      router.push(String(href));
    }
  };

  if (href) {
    return (
      <Card
        className={clsx('h-min px-0 py-0', 'cursor-pointer', 'hover:border-gray-400 dark:hover:border-neutral-700')}
        onClick={handleRedirect}
      >
        {children}
      </Card>
    );
  }

  return <Card className="h-min px-0 py-0">{children}</Card>;
};
