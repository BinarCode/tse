import Exception from './Exception';
class EmailNotSentException extends Exception {
    constructor(message, code = 404) {
        super(message, code);
    }
}

export default EmailNotSentException;
