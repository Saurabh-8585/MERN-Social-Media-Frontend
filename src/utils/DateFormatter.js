import { format, formatDistanceToNow } from 'date-fns';
export const getTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const profileDate = (date) => {
    const accountCreationDate = new Date(date)
    return format(accountCreationDate, 'MMMM d, yyyy')


}