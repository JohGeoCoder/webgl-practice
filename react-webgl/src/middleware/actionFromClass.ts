import { Dispatch, AnyAction } from 'redux';

export const actionFromClassMiddleware = () =>
    (next: Dispatch) =>
        (action: AnyAction) => {
            next({ ...action });
        };
