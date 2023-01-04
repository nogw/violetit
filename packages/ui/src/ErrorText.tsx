import clsx from 'clsx';

interface ErrorTextProps {
  children: React.ReactNode;
}

export const ErrorText = ({ children }: ErrorTextProps) => (
  <div
    className={clsx(
      'bg-red-100 border-l-4 border-red-500',
      'rounded mt-4 px-3 py-1',
      'text-red-700',
    )}
    role="alert"
  >
    <p className="font-bold">Error</p>
    <p>{children}</p>
  </div>
);
