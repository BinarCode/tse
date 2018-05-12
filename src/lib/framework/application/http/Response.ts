import {Response as ExpressResponse} from 'express';
import {httpStatusCodes} from './httpStatusCodes';
import {apiResponseCodes} from './apiResponseCodes';
export interface Response extends ExpressResponse {
    respond: Function;
};
/**
 * Reply with status code and specific unique interface data
 * @param res
 * @param data
 * @param message
 * @param responseCode - used for implementing specific behaviour on the frontend part (for example show a notify message)
 * @param statusCode - http request code
 * @returns {*}
 */
export const Response = res => {
    return function(
        data = {},
        message = null,
        responseCode = apiResponseCodes.ok,
        statusCode = httpStatusCodes.ok
    ) {
        res.status(statusCode).json({
            data: data,
            message: message,
            responseCode: responseCode
        });
    };
};
