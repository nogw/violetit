import { Card, Input } from '@violetit/ui';

import { Link } from '@/shared-components/Link';

type PostComposerProps = {
  community?: string;
};

export const PostComposer = ({ community }: PostComposerProps) => {
  const link = community ? `/submit/${community}` : '/submit';

  return (
    <Card className="p-2 mb-0">
      <Link className="w-full" to={link}>
        <Input placeholder="Create post" />
      </Link>
    </Card>
  );
};
