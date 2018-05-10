export class Authenticate {
    constructor () {
    }

    public handle(req, res, next) {
        console.log('Authenticate middleware - check if is authenticated');
        next();
    }
}
