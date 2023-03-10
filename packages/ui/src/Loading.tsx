import { BiLoaderAlt } from 'react-icons/bi';

export const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <BiLoaderAlt className="h-8 w-8 animate-spin text-orange-600 duration-700" />
    </div>
  );
};
