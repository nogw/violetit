import { useFormikContext, useField } from 'formik';
import { FiCode } from 'react-icons/fi';

import { SelectInputProps } from '@violetit/ui/src/SelectInput';
import { Box, SelectInput } from '@violetit/ui';

type SelectFieldProps = SelectInputProps & {
  name: string;
};

export const SelectField = ({ name, ...props }: SelectFieldProps) => {
  const { isSubmitting } = useFormikContext();
  const [field] = useField(name);

  return (
    <Box className="relative inline-block w-full transition-colors md:w-64">
      <Box className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">
        <FiCode width=".9em" className="rotate-90 opacity-50" />
      </Box>
      <SelectInput className="pr-10" {...field} {...props} disabled={isSubmitting} />
    </Box>
  );
};
