import Exception from './Exception';
class DriverNotFoundException extends Exception {
    constructor(message, code = 503) {
        super(message, code);
    }
}

export default DriverNotFoundException;
