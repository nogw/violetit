import { formatDistanceStrict, format } from 'date-fns';

const timeAgo = (date: Date): string => {
  return formatDistanceStrict(date, new Date(), {
    addSuffix: true,
  });
};

const formatDate = (date: Date): string => {
  return format(date, 'MMMM dd yyyy');
};

export { timeAgo, formatDate };
