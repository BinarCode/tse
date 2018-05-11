export class Authenticate {
    constructor () {
    }

    public handle(args) {
        console.log(args, 'Encapsuleted arguments from the route');
        return (req, res, next) => {
            next();
        };
    }
}
