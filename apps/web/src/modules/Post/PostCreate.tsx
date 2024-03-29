import { Card, TextField } from '@violetit/ui';
import { Link } from 'src/common/Link';

export const PostCreate = () => {
  return (
    <Card className="mb-2 p-2">
      <Link className="w-full" to={'/submit'}>
        <TextField placeholder="Create post" aria-required={false} aria-label="Click to create a post" />
      </Link>
    </Card>
  );
};
