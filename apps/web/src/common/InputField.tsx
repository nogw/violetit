import { TextField } from '@violetit/ui';

import { InputHTMLAttributes } from 'react';
import { useFormikContext, useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export const InputField = ({ name, ...props }: InputFieldProps) => {
  const { className, ...rest } = props;

  const [field, meta] = useField(name);
  const { isSubmitting } = useFormikContext();

  const hasAnErrorAndHasBeenTouched = !!meta.error && !!meta.touched;

  return <TextField hasError={hasAnErrorAndHasBeenTouched} {...field} {...rest} disabled={isSubmitting} />;
};
