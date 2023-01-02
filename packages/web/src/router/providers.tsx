import { BrowserRouter } from 'react-router-dom';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <BrowserRouter>{children}</BrowserRouter>
);
