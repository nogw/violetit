import { format } from 'date-fns';

export const formatDate = (date: Date): string => format(date, 'MMMM dd yyyy');
