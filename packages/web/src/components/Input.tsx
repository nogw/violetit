interface InputProps {
  type?: string;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({ type, placeholder }) => {
  return <input type={type || 'text'} placeholder={placeholder} />;
};
