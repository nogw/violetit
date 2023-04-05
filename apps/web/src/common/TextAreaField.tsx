import { TextArea } from '@violetit/ui';

import { TextareaHTMLAttributes } from 'react';
import { useFormikContext, useField } from 'formik';

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
};

export const TextAreaField = ({ name, ...props }: TextAreaFieldProps) => {
  const { className, ...rest } = props;

  const [field, meta] = useField(name);
  const { isSubmitting } = useFormikContext();

  const hasAnErrorAndHasBeenTouched = !!meta.error && !!meta.touched;

  return <TextArea hasError={hasAnErrorAndHasBeenTouched} {...field} {...rest} disabled={isSubmitting} />;
};
