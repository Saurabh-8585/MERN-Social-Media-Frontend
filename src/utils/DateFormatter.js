import { formatDistanceToNow } from 'date-fns';
export const getTimeAgo = (date) => {
    return formatDistanceToNow( new Date(date), { addSuffix: true });
};
