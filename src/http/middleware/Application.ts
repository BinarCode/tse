export class Application {
    public handle(req, res, next) {
        console.log('App middleware');
        next();
    }
}
