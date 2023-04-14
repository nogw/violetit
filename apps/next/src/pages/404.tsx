import { Box, Button, Container, Flex } from '@violetit/ui';

import type { NextPage } from 'next';
import Link from 'next/link';

const Custom404: NextPage = () => {
  return (
    <Container className="flex h-full items-center justify-center dark:bg-black dark:text-gray-100">
      <Flex className="flex-col items-center justify-center">
        <Box className="max-w-md text-center">
          <h1 className="mb-2 text-9xl font-extrabold dark:text-orange-600">
            <span className="sr-only">Error</span>404
          </h1>
          <h3 className="text-2xl font-semibold md:text-3xl">Sorry, we couldn&apos;t find this page on Violetit.</h3>
          <p className="mt-4 mb-8 dark:text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link href={'/'}>
            <Button variant="neutral" size="lg">
              Back to homepage
            </Button>
          </Link>
        </Box>
      </Flex>
    </Container>
  );
};

export default Custom404;
