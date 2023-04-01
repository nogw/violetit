import React, { ButtonHTMLAttributes } from 'react';
import { TbArrowBigUp, TbArrowBigDown } from 'react-icons/tb';
import clsx from 'clsx';

type VoteButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: 'up' | 'down';
  voted?: string;
};

export const VoteButton = React.forwardRef<HTMLButtonElement, VoteButtonProps>(
  ({ direction, voted, ...props }, ref) => {
    const styles = {
      base: 'text-neutral-400 px-0 h-6 w-6 duration-150 rounded-sm hover:bg-gray-100 hover:bg-neutral-800',
      upvote: 'hover:text-orange-400',
      downvote: 'hover:text-sky-400',
      upvoted_active: 'text-orange-400',
      downvote_active: 'text-sky-400',
    };

    return (
      <button {...props} ref={ref}>
        {direction === 'up' ? (
          <TbArrowBigUp className={clsx(styles.base, styles.upvote, { [styles.upvoted_active]: voted === 'UPVOTE' })} />
        ) : (
          <TbArrowBigDown
            className={clsx(styles.base, styles.downvote, { [styles.downvote_active]: voted === 'DOWNVOTE' })}
          />
        )}
      </button>
    );
  },
);
