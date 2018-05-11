import * as express from 'express';
import {Core} from './lib/framework/application/Core';
/**
 * Arhitecture based on this article:
 * https://itnext.io/building-restful-web-apis-with-node-js-express-mongodb-and-typescript-part-1-2-195bdaf129cf
 */
class App {
    public app: express.Application;
    public core: Core;

    constructor() {
        this.app = express();
        this.core = new Core(this.app);
    }
}

export default new App().app;
