import clsx from 'clsx';

type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  initial: string;
  options: Array<{ value: string; text: string }>;
};

export const SelectInput = ({
  className,
  initial,
  options,
}: SelectInputProps) => {
  return (
    <select
      className={clsx(
        'rounded-lg border border-gray-300',
        'text-gray-900 text-sm',
        'w-full outline-none cursor-pointer bg-white p-2',
        className,
      )}
    >
      <option defaultValue={initial}>{initial}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};
