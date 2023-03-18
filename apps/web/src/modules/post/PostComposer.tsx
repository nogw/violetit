import { Card, TextField } from '@violetit/ui';
import { Link } from 'src/common/Link';

export const PostComposer = () => {
  return (
    <Card className="mb-2 p-2">
      <Link className="w-full" to={'/submit'}>
        <TextField placeholder="Create post" />
      </Link>
    </Card>
  );
};
