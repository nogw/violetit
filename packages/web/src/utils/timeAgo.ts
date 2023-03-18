import { formatDistanceStrict } from 'date-fns';

export const timeAgo = (date: Date): string => {
  return formatDistanceStrict(date, new Date(), {
    addSuffix: true,
  });
};
