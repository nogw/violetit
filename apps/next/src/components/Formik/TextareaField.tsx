import { useFormikContext, useField } from 'formik';
import { TextareaHTMLAttributes } from 'react';

import { TextArea } from '@violetit/ui';

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
};

export const TextareaField = ({ name, ...props }: TextareaFieldProps) => {
  const { className, ...rest } = props;

  const [field, meta] = useField(name);
  const { isSubmitting } = useFormikContext();

  const hasAnErrorAndHasBeenTouched = !!meta.error && meta.touched;

  return (
    <TextArea border={hasAnErrorAndHasBeenTouched ? 'error' : 'default'} disabled={isSubmitting} {...field} {...rest} />
  );
};
