export class Authenticate {
    constructor () {
    }

    public handle(args) {
        return (req, x, next) => {
            next();
        };
    }
}
