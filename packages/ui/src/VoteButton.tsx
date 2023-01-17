import clsx from 'clsx';

import { ButtonHTMLAttributes } from 'react';
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb';

type VoteButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: 'up' | 'down';
};

export const VoteButton = ({ direction, ...props }: VoteButtonProps) => {
  const iconClsx =
    'text-neutral-400 px-0 h-6 w-6 duration-150 hover:bg-gray-100 rounded-sm';

  return (
    <button {...props}>
      {direction === 'up' ? (
        <TbArrowBigTop className={clsx(iconClsx, 'hover:text-orange-400')} />
      ) : (
        <TbArrowBigDown className={clsx(iconClsx, 'hover:text-sky-400')} />
      )}
    </button>
  );
};
