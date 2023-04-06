import { TextField } from '@violetit/ui';

import { InputHTMLAttributes } from 'react';
import { useFormikContext, useField } from 'formik';

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
    <TextField
      label={label}
      border={hasAnErrorAndHasBeenTouched ? 'error' : 'default'}
      {...field}
      {...rest}
      disabled={isSubmitting}
    />
  );
};
