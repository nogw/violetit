import { Button, Box, Flex, TextField } from '@violetit/ui';
import { useSnackbar } from 'notistack';

import { useState } from 'react';
import { useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';

import { CommunityCreate } from './mutations/CommunityCreateMutation';
import { CommunityCreateMutation } from './mutations/__generated__/CommunityCreateMutation.graphql';

export const CommunityComposer = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [communityCreate, isPending] = useMutation<CommunityCreateMutation>(CommunityCreate);

  const onSubmit = () => {
    closeSnackbar();

    communityCreate({
      variables: {
        name,
        title,
      },
      onCompleted: ({ communityCreate }) => {
        if (communityCreate?.error && communityCreate.error.message) {
          enqueueSnackbar(communityCreate.error.message, { variant: 'error' });
        }

        if (!communityCreate?.communityEdge) {
          return;
        }

        navigate(`/r/${communityCreate.communityEdge.node?.id}`, {
          replace: true,
        });
      },
    });
  };

  const isDisabled = title.length <= 3 || name.length <= 3 || isPending;

  return (
    <Box>
      <Flex className="flex-col gap-2">
        <TextField
          className="sm:w-64"
          label="Name"
          placeholder="r/name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          className="sm:w-64"
          label="Title"
          placeholder="Community Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Box className="mt-2 ml-auto">
          <Button aria-label="Create community" disabled={isDisabled} variant="secondary" onClick={onSubmit}>
            Create
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
