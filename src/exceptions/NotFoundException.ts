import Exception from './Exception';
class NotFoundException extends Exception {
    constructor(message, code = 404) {
        super(message, code);
    }
}

export default NotFoundException;
