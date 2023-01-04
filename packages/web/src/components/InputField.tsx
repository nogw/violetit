import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import { useFormikContext, useField } from 'formik';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export const Input: React.FC<InputProps> = ({ name, ...props }) => {
  const { className, ...rest } = props;

  const [field, meta] = useField(name);
  const { isSubmitting } = useFormikContext();

  const hasAnErrorAndHasBeenTouched = !!meta.error && !!meta.touched;

  return (
    <input
      className={clsx(className, 'rounded border px-2 py-2 text-xl', {
        'border-gray-300': !hasAnErrorAndHasBeenTouched,
        'border-red-500': hasAnErrorAndHasBeenTouched,
      })}
      {...field}
      {...rest}
      disabled={isSubmitting}
    />
  );
};
