interface ButtonProps {
  children: string;
}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};
