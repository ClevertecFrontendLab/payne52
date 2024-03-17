export const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return Intl.DateTimeFormat().format(dateObj);
};
