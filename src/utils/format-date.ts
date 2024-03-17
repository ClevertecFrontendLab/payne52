export const formatDate = (date: string | number) => {
    let dateToFormat;

    if (typeof date === 'string') {
        dateToFormat = new Date(date);
    } else {
        dateToFormat = date;
    }

    return Intl.DateTimeFormat().format(dateToFormat);
};
