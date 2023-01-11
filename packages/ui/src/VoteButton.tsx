import clsx from 'clsx';

import { ButtonHTMLAttributes } from 'react';
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb';

type VoteButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: 'up' | 'down';
};

export const VoteButton = ({ direction, ...props }: VoteButtonProps) => {
  const iconClsx =
    'text-neutral-500 px-0.5 h-5 w-5 duration-150 hover:bg-gray-100 rounded-sm';

  return (
    <button {...props}>
      {direction === 'up' ? (
        <TbArrowBigTop className={clsx(iconClsx, 'hover:text-orange-300')} />
      ) : (
        <TbArrowBigDown className={clsx(iconClsx, 'hover:text-sky-300')} />
      )}
    </button>
  );
};
