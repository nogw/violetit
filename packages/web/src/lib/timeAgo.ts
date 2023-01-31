import { formatDistance } from 'date-fns';

export const timeAgo = (date: Date): string => {
  return formatDistance(date, new Date(), {
    addSuffix: true,
  });
};
