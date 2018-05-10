import {isUndefined} from 'lodash';
import {auth} from './auth';

export const list = {
    auth: auth
};

export const middleware = (middlewareKey) => {
    if (isUndefined(list[middlewareKey])) {
        throw new Error(`Middleware ${middlewareKey} is not defined.`);
    }

    return list[middlewareKey];
};
