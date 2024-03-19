export const position = (e: React.MouseEvent<HTMLElement>) => {
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    if (innerWidth > 768) {
        const cellLeft = e.currentTarget.getBoundingClientRect().left;
        const cellTop = e.currentTarget.getBoundingClientRect().top;

        let right = 'auto';
        let left = 'auto';
        let top = 'auto';
        let bottom = 'auto';

        if (cellLeft + 300 > innerWidth) {
            right = '0';
        } else {
            left = '0';
        }

        if (cellTop + 300 > innerHeight) {
            bottom = '-24px';
        } else {
            top = '0';
        }

        return { left: left, right: right, top: top, bottom: bottom };
    } else {
        const cellTop = e.currentTarget.getBoundingClientRect().top - 25;

        return { left: 24, top: cellTop };
    }
};
