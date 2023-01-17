import { BiLoaderAlt } from 'react-icons/bi';

export const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <BiLoaderAlt className="text-orange-600 duration-700 animate-spin h-8 w-8" />
    </div>
  );
};
