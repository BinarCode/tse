export class Authenticate {
    constructor () {
    }

    public encapsulate(args) {
        return (req, res, next) => {
            console.log(args, 'Encapsuleted arguments from the route');
            next();
        };
    }
}
