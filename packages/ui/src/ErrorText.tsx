import clsx from 'clsx';

interface ErrorTextProps {
  children: React.ReactNode;
}

export const ErrorText = ({ children }: ErrorTextProps) => (
  <div className={clsx('border-l-4 border-red-500 bg-red-100', 'mt-4 rounded px-3 py-1', 'text-red-700')} role="alert">
    <p className="font-bold">Error</p>
    <p>{children}</p>
  </div>
);
