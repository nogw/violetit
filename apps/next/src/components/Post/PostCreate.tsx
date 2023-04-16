import { Card, TextField } from '@violetit/ui';
import NextLink from 'next/link';

export const PostCreate = () => {
  return (
    <Card className="mb-2 p-2">
      <NextLink href={'/submit'} className="w-full">
        <TextField readOnly placeholder="Create post" aria-required={false} aria-label="Click to create a post" />
      </NextLink>
    </Card>
  );
};
