export class StartSession {
    constructor () {

    }

    public handle(req, res, next) {
        console.log('Start Session');
        next();
    }
}
