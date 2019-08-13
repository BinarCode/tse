import Exception from './Exception';
const Status = require('http-status');
import { $logger } from '../../src/utils/logger';

const GenericException = (err, req, res, next) => {
    $logger(err, 'error');
    console.error(err);
    if (err instanceof Exception) {
        res.status(err.getCode()).json({
            error: err,
            message: err.getMessage(),
        });
    } else {
        res.status(Status.INTERNAL_SERVER_ERROR).json({
            type: 'InternalServerError',
            error: err,
        });
    }
};
export default GenericException;
