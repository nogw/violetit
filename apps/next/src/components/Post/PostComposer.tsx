import { Card, Flex, Button, ErrorText, Box, InfoText } from '@violetit/ui';

import { Form, useFormik, FormikProvider, FormikHelpers } from 'formik';
import { graphql, useFragment, useMutation } from 'react-relay';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';

import { TextareaField } from 'src/components/Formik/TextareaField';
import { SelectField } from 'src/components/Formik/SelectField';
import { InputField } from 'src/components/Formik/InputField';
import { PostComposerTags } from './PostComposerTags';
import { PostCreate } from './mutations/PostCreateMutation';
import { PostComposer_query$key } from 'src/__generated__/PostComposer_query.graphql';
import { PostCreateMutation } from 'src/__generated__/PostCreateMutation.graphql';

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
  const [postCreate, isPending] = useMutation<PostCreateMutation>(PostCreate);
  const [postTags, setPostTags] = useState<TagValue[]>([]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { push } = useRouter();

  const onSubmit = (inputs: PostValues, actions: FormikHelpers<PostValues>) => {
    closeSnackbar();

    const tagsId = postTags.map(tag => tag.id);
    const values = { tags: tagsId, ...inputs };

    postCreate({
      variables: { input: values },
      onCompleted: ({ postCreate }) => {
        if (postCreate?.error && postCreate.error.message) {
          const inputs: Array<keyof typeof values> = ['title', 'content'];

          inputs.forEach(input => {
            actions.setFieldValue(input, '', false);
            actions.setFieldTouched(input, false);
          });

          actions.setSubmitting(false);

          enqueueSnackbar(postCreate.error.message, { variant: 'error' });
        }

        if (!postCreate?.postEdge) {
          push(`/r/${values.community}`);
          return;
        }

        const { postEdge } = postCreate;

        const postId = postEdge.node?.id;
        const communityId = postEdge.node?.community?.id;

        push(`/community/${communityId}/post/${postId}`);
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

  const options = data.communities.edges.flatMap(edge => (edge?.node ? { value: edge.node } : []));
  const optionSelected = options.find(option => option.value.id === values.community)?.value;

  return (
    <FormikProvider value={formik}>
      <Form className="w-full">
        <SelectField name="community" value={values.community} onChange={formik.handleChange}>
          <option defaultValue="">Select a community</option>
          {options.map((option, index) => (
            <option key={index} value={option.value.id}>
              r/{option.value.name}
            </option>
          ))}
        </SelectField>
        <Card className="mt-2 px-4 py-4">
          <Flex direction="col" fullWidth className="gap-4">
            <InputField name="title" placeholder="Title" aria-required aria-label="Post title" />
            <TextareaField name="content" aria-required aria-label="Post content" />
            <Box>
              {optionSelected ? (
                <PostComposerTags community={optionSelected} selectedTags={postTags} onSelectedChange={setPostTags} />
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
