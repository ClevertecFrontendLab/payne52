export type ErrorData = {
    status: number;
    data: {
        statusCode: number;
        error: 'string';
        message: 'string';
    };
};
