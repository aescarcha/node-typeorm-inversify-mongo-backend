export interface ITransactionResult<T> {
    result: 'success' | 'error' | 'warning';
    error?: any;
    data?: T;
}

export interface IQueryResult<T> {
    data?: T | T[];
    error?: any;
}

export interface IMultipleQueryResult<T> {
    data?: T[];
    count?: number;
    error?: any;
}
