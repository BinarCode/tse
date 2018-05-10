import {isUndefined} from 'lodash';

export const check = (obj: Object, prop: string, message: string = undefined): Error | boolean => {
    if (isUndefined(obj[prop])) {
        throw new Error(message || `Property ${prop} is not present in the object passed`);
    }

    return true;
};
