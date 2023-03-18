import { Card, TextField } from '@violetit/ui';
import { Link } from '@/common/Link';

type PostComposerProps = {
  community?: string;
};

export const PostComposer = ({ community }: PostComposerProps) => {
  const link = community ? `/submit/${community}` : '/submit';

  return (
    <Card className="mb-2 p-2">
      <Link className="w-full" to={link}>
        <TextField placeholder="Create post" />
      </Link>
    </Card>
  );
};
