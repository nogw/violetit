import React, { ButtonHTMLAttributes } from 'react';
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb';
import clsx from 'clsx';

type VoteButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: 'up' | 'down';
  voted?: string;
};

export const VoteButton = React.forwardRef<HTMLButtonElement, VoteButtonProps>(
  ({ direction, voted, ...props }, ref) => {
    const iconClsx = 'text-neutral-400 px-0 h-6 w-6 duration-150 rounded-sm hover:bg-gray-100';

    return (
      <button {...props} ref={ref}>
        {direction === 'up' ? (
          <TbArrowBigTop className={clsx(iconClsx, 'hover:text-orange-400', voted === 'UPVOTE' && 'text-orange-400')} />
        ) : (
          <TbArrowBigDown className={clsx(iconClsx, 'hover:text-sky-400', voted === 'DOWNVOTE' && 'text-sky-400')} />
        )}
      </button>
    );
  },
);
