import { Card, Flex, Button, ErrorText, Box, InfoText } from '@violetit/ui';

import { Form, useFormik, FormikProvider, FormikHelpers } from 'formik';
import { graphql, useFragment, useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import * as yup from 'yup';

import { PostCreateMutation } from './mutations/__generated__/PostCreateMutation.graphql';
import { PostComposer_query$key } from './__generated__/PostComposer_query.graphql';

import { PostComposerTags } from './PostComposerTags';
import { PostCreate } from './mutations/PostCreateMutation';

import { TextAreaField } from '../../common/TextAreaField';
import { SelectField } from '../../common/SelectField';
import { InputField } from '../../common/InputField';

type TagValue = {
  id: string;
  label: string;
  color: string;
};

type PostValues = {
  tags?: string[];
  title: string;
  content: string;
  community: string;
};

type PostComposerProps = {
  query: PostComposer_query$key;
};

export const QueryPostComposer = graphql`
  fragment PostComposer_query on Query @argumentDefinitions(filters: { type: CommunityFilters }) {
    communities(filters: $filters) {
      edges {
        node {
          id
          name
          ...PostComposerTags_query
        }
      }
    }
  }
`;

export const PostComposer = ({ query }: PostComposerProps) => {
  const navigate = useNavigate();

  const [tags, setTags] = useState<TagValue[]>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [postCreate, isPending] = useMutation<PostCreateMutation>(PostCreate);

  const onSubmit = (inputs: PostValues, actions: FormikHelpers<PostValues>) => {
    closeSnackbar();

    const tagsId = tags.map(tag => tag.id);
    const values = { tags: tagsId, ...inputs };

    postCreate({
      variables: values,
      onCompleted: ({ postCreate }) => {
        if (postCreate?.error && postCreate.error.message) {
          const inputs: Array<keyof typeof values> = ['title', 'content'];

          inputs.forEach(input => {
            actions.setFieldValue(input, '', false);
            actions.setFieldTouched(input, false);
          });

          actions.setSubmitting(false);

          enqueueSnackbar(postCreate.error.message, { variant: 'error' });
          return;
        }

        if (!postCreate?.postEdge) {
          return navigate(`/r/${values.community}`);
        }

        const { postEdge } = postCreate;

        const postId = postEdge.node?.id;
        const communityId = postEdge.node?.community?.id;

        return navigate(`/r/${communityId}/p/${postId}`, {
          replace: true,
        });
      },
    });
  };

  const formik = useFormik<PostValues>({
    initialValues: {
      title: '',
      content: '',
      community: '',
    },
    validateOnMount: true,
    validationSchema: yup.object().shape({
      title: yup.string().required('Title is required'),
      content: yup.string().required('Content is required'),
      community: yup.string().required('Community is required'),
    }),
    onSubmit,
  });

  const data = useFragment<PostComposer_query$key>(QueryPostComposer, query);

  if (!data) {
    return <ErrorText>You are not logged!</ErrorText>;
  }

  if (!data.communities) {
    return <ErrorText>No communities found</ErrorText>;
  }

  const { isValid, isSubmitting, values } = formik;
  const isDisabled = !isValid || isPending;

  const communities = data.communities.edges.flatMap(edge => (edge?.node ? { value: edge.node } : []));

  const communitySelected = communities.find(option => option.value.id === values.community);

  return (
    <FormikProvider value={formik}>
      <Form className="w-full">
        <SelectField name="community">
          <option defaultValue={''}>Select a community</option>
          {communities.map((option, index) => (
            <option key={index} value={option.value.id}>
              r/{option.value.name}
            </option>
          ))}
        </SelectField>
        <Card className="mt-2 px-4 py-4">
          <Flex direction="col" isFullWidth className="gap-4">
            <InputField name="title" placeholder="Title" aria-required aria-label="Post title" />
            <TextAreaField name="content" aria-required aria-label="Post content" />
            <Box>
              {communitySelected ? (
                <PostComposerTags community={communitySelected.value} selectedTags={tags} onSelectedChange={setTags} />
              ) : (
                <InfoText>This community has not created tags for posts</InfoText>
              )}
            </Box>
            <Box className="ml-auto">
              <Button type="submit" disabled={isDisabled} size="md" variant="primary" aria-label="Create post">
                {isSubmitting ? 'Wait...' : 'Create post'}
              </Button>
            </Box>
          </Flex>
        </Card>
      </Form>
    </FormikProvider>
  );
};
