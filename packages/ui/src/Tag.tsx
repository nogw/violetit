type TagProps = {
  color: string;
  label: string;
};

export const Tag = ({ color, label }: TagProps) => {
  return (
    <div className="my-2 border p-2" style={{ backgroundColor: color }}>
      {label}
    </div>
  );
};
