import { useFormikContext, useField, ErrorMessage } from 'formik';
import { InputHTMLAttributes } from 'react';

import { Box, Flex, Text, TextField } from '@violetit/ui';
import { MdError } from 'react-icons/md';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
};

export const InputField = ({ name, label, ...props }: InputFieldProps) => {
  const { className, ...rest } = props;

  const [field, meta] = useField(name);
  const { isSubmitting } = useFormikContext();

  const hasAnErrorAndHasBeenTouched = !!meta.error && !!meta.touched;

  return (
    <Box>
      <TextField
        label={label}
        border={hasAnErrorAndHasBeenTouched ? 'error' : 'default'}
        {...field}
        {...rest}
        disabled={isSubmitting}
      />
      <ErrorMessage name={name} data-testid={`error-message-${name}`}>
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
