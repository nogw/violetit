import { Card, Input } from '@violetit/ui';

import { Link } from '@/shared-components/Link';

type PostComposerProps = {
  communityName?: string;
};

export const PostComposer = ({ communityName }: PostComposerProps) => {
  const link = communityName ? `/submit/${communityName}` : '/submit';

  return (
    <Card className="p-2">
      <Link className="w-full" to={link}>
        <Input placeholder="Create post" />
      </Link>
    </Card>
  );
};
