import { Button, ColorInput, Flex, Tag } from '@violetit/ui';

import { Form, FormikHelpers, FormikProvider, useFormik } from 'formik';
import { useMutation } from 'react-relay';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';

import { CreateTagMutation } from './mutations/__generated__/CreateTagMutation.graphql';
import { CreateTag } from './mutations/CreateTagMutation';
import { InputField } from 'src/common/InputField';

type TagFieldValues = {
  label: string;
  color: string;
};

type TagComposerProps = {
  communityId: string;
  callbackTag: (tag: { id: string; color: string; label: string }) => void;
  handleClose: () => void;
};

export const TagComposer = ({ callbackTag, handleClose, communityId }: TagComposerProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [commit] = useMutation<CreateTagMutation>(CreateTag);

  const onSubmit = (values: TagFieldValues, actions: FormikHelpers<TagFieldValues>) => {
    closeSnackbar();

    const input = { ...values, communityId };

    commit({
      variables: { input },
      onCompleted: ({ tagCreateMutation }) => {
        if (tagCreateMutation?.error && tagCreateMutation.error.message) {
          const inputs: Array<keyof typeof values> = ['label', 'color'];

          inputs.forEach(input => {
            actions.setFieldValue(input, '', false);
            actions.setFieldTouched(input, false);
          });

          actions.setSubmitting(false);

          enqueueSnackbar(tagCreateMutation.error.message, { variant: 'error' });
          handleClose();
        }

        if (tagCreateMutation?.success && tagCreateMutation?.tagEdge?.node) {
          callbackTag(tagCreateMutation.tagEdge.node);
          handleClose();
        }
      },
    });
  };

  const formik = useFormik<TagFieldValues>({
    initialValues: {
      label: '',
      color: '#FFFFFF',
    },
    validateOnMount: true,
    validationSchema: yup.object().shape({
      label: yup.string().required('Label is required'),
      color: yup
        .string()
        .matches(/^#[0-9a-fA-F]{6}$/, 'Color must be in the format "#rrggbb"')
        .required('Color is required'),
    }),
    onSubmit,
  });

  const { isValid, isSubmitting, values } = formik;

  return (
    <FormikProvider value={formik}>
      <Form>
        <Flex direction="col" className="gap-2 border-b pb-2 dark:border-neutral-700">
          <InputField name="label" label="Tag label" placeholder="label" aria-required aria-label="Tag label" />
          <ColorInput
            name="color"
            label="Tag color"
            value={values.color}
            onChange={formik.handleChange}
            aria-required
            aria-label="Tag color"
          />
          {values.label && values.color ? <Tag label={values.label} color={values.color} /> : null}
        </Flex>
        <Flex className="mt-2 justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={!isValid}
            aria-label="Cancel and close"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={!isValid} aria-label="Create tag">
            {isSubmitting ? 'Wait...' : 'Create'}
          </Button>
        </Flex>
      </Form>
    </FormikProvider>
  );
};
