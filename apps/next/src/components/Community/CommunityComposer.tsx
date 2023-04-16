import { Button, Box, Flex } from '@violetit/ui';

import { Form, FormikHelpers, FormikProvider, useFormik } from 'formik';
import { useMutation } from 'react-relay';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import { CommunityCreateMutation } from 'src/__generated__/CommunityCreateMutation.graphql';
import { CommunityCreate } from './mutations/CommunityCreateMutation';
import { InputField } from 'src/components/Formik/InputField';

type CommunityFieldValues = {
  name: string;
  title: string;
};

export const CommunityComposer = () => {
  const router = useRouter();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [communityCreate, isPending] = useMutation<CommunityCreateMutation>(CommunityCreate);

  const onSubmit = (values: CommunityFieldValues, actions: FormikHelpers<CommunityFieldValues>) => {
    closeSnackbar();

    communityCreate({
      variables: { input: values },
      onCompleted: ({ communityCreate }) => {
        if (communityCreate?.error && communityCreate.error.message) {
          const inputs: Array<keyof typeof values> = ['name', 'title'];

          inputs.forEach(input => {
            actions.setFieldValue(input, '', false);
            actions.setFieldTouched(input, false);
          });

          actions.setSubmitting(false);

          enqueueSnackbar(communityCreate.error.message, { variant: 'error' });
        }

        if (!communityCreate?.communityEdge) {
          return;
        }

        router.push(`/r/${communityCreate.communityEdge.node?.id}`);
      },
    });
  };

  const formik = useFormik<CommunityFieldValues>({
    initialValues: {
      name: '',
      title: '',
    },
    validateOnMount: true,
    validationSchema: yup.object().shape({
      name: yup.string().required('Title is required'),
      title: yup.string().required('Content is required'),
    }),
    onSubmit,
  });

  const { isValid, isSubmitting } = formik;
  const isDisabled = !isValid || isPending;

  return (
    <FormikProvider value={formik}>
      <Form>
        <Flex direction="col" className="gap-2">
          <InputField name="name" label="Name" placeholder="r/name" aria-required aria-label="Community name" />
          <InputField name="title" label="Title" placeholder="Title" aria-required aria-label="Community title" />
          <Box className="mt-2 ml-auto">
            <Button type="submit" aria-label="Create community" disabled={isDisabled} variant="secondary">
              {isSubmitting ? 'Wait...' : 'Create'}
            </Button>
          </Box>
        </Flex>
      </Form>
    </FormikProvider>
  );
};
