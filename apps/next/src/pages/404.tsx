import { Box, Button, Container, Flex } from '@violetit/ui';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Custom404: NextPage = () => {
  const { push } = useRouter();

  return (
    <Container className="flex h-full items-center justify-center bg-white dark:bg-black">
      <Flex direction="col">
        <Box className="max-w-md text-center">
          <h1 className="mb-2 text-9xl font-extrabold text-orange-600">404</h1>
          <h3 className="text-2xl font-semibold md:text-3xl">Sorry, we couldn&apos;t find this page on Violetit.</h3>
          <p className="mt-4 mb-6 dark:text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Button onClick={() => push('/')} variant="neutral" size="lg">
            Back to homepage
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default Custom404;
