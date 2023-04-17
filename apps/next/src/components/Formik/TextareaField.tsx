import { useFormikContext, useField, ErrorMessage } from 'formik';
import { TextareaHTMLAttributes } from 'react';

import { Box, Flex, Text, TextArea } from '@violetit/ui';
import { MdError } from 'react-icons/md';

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
};

export const TextareaField = ({ name, ...props }: TextareaFieldProps) => {
  const { className, ...rest } = props;

  const [field, meta] = useField(name);
  const { isSubmitting } = useFormikContext();

  const hasAnErrorAndHasBeenTouched = !!meta.error && meta.touched;

  return (
    <Box>
      <TextArea
        border={hasAnErrorAndHasBeenTouched ? 'error' : 'default'}
        disabled={isSubmitting}
        {...field}
        {...rest}
      />
      <ErrorMessage name={name}>
        {error => (
          <Flex className="items-center gap-1">
            <MdError className="text-red-600" />
            <Text data-testid={`error-message-${name}`} className="text-red-600">
              {error}
            </Text>
          </Flex>
        )}
      </ErrorMessage>
    </Box>
  );
};
