import { SelectInput } from '@violetit/ui';

import { SelectHTMLAttributes } from 'react';
import { useFormikContext, useField } from 'formik';

type SelectFieldField = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
};

export const SelectField = ({ name, children, ...props }: SelectFieldField) => {
  const { className, ...rest } = props;

  const [field] = useField(name);
  const { isSubmitting } = useFormikContext();

  return (
    <SelectInput {...field} {...rest} disabled={isSubmitting}>
      {children}
    </SelectInput>
  );
};
