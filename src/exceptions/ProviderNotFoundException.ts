import Exception from './Exception';
class ProviderNotFoundException extends Exception {
    constructor(message, code = 404) {
        super(message, code);
    }
}

export default ProviderNotFoundException;
