type TagProps = {
  color: string;
  label: string;
};

export const Tag = ({ color, label }: TagProps) => {
  return (
    <span
      className="mr-1 h-min w-min rounded-full px-2 pb-0.5 text-sm font-bold text-neutral-900"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
};
