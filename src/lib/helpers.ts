import {isUndefined} from 'lodash';
import {log} from './cli/chalk';
import {Exception} from './framework/exceptions/Exception';

export const check = (obj: Object, prop: string, message: string = undefined): Error | boolean => {
    if (isUndefined(obj[prop])) {
        let msg = message || `Property ${prop} is not present in the object passed`;
        log.error(msg);
        throw new Exception(msg);
    }

    return true;
};
