import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/routes';
import * as config from './config/env';
/**
 * Arhitecture based on this article:
 * https://itnext.io/building-restful-web-apis-with-node-js-express-mongodb-and-typescript-part-1-2-195bdaf129cf
 */
class App {

    public app: express.Application;
    public router: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(this.router.getRoutes());

    }

}

export default new App().app;
