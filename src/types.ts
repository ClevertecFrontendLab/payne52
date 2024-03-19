export type ErrorData = {
    status: number;
    data: {
        statusCode: number;
        error: 'string';
        message: 'string';
    };
};

export type ModalProps = {
    desktopSize?: boolean | undefined;
    open?: boolean;
    close?: () => void;
    dataTestId?: string;
};
