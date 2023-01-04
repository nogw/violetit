interface ErrorTextProps {
  children: React.ReactNode;
}

export const ErrorText = ({ children }: ErrorTextProps) => {
  return <h1>{children}</h1>;
};
