import { ErrorData } from 'src/types';

export const isErrorWithMessage = (error: unknown): error is ErrorData =>
    typeof error === 'object' &&
    error != null &&
    'data' in error &&
    typeof (error as Record<string, unknown>).data === 'object';
