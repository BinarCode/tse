export class StartSession {
    constructor() {}

    public handle(req, res, next) {
        next();
    }
}

export default StartSession;
