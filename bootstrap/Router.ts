const cors = require('cors');
import Middleware from '../src/utils/core/Middleware';
import Response from '../src/utils/Response';
import fileUpload from 'express-fileupload';
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const { Router: ExpressRouter } = require('express');
const statusMonitor = require('express-status-monitor');

class Router {
    router;

    constructor() {
        this.router = ExpressRouter();
        this.init();
        this.router.middleware = this.middleware;
        this.router.use(this.response);
    }

    init() {
        /* istanbul ignore if */
        if (process.env.NODE_ENV === 'development') {
            this.router.use(statusMonitor());
        }

        this.router
            .use(methodOverride('X-HTTP-Method-Override'))
            .use(cors())
            .use(
                bodyParser.json({
                    verify(req, res, buf) {
                        req.rawBody = buf;
                    },
                })
            )
            .use(compression())
            /**
             * Busboy
             */
            .use(fileUpload());

        this.router.get('/', function(req, res) {
            return res.send(`Silence is golden`);
        });

        return this;
    }

    middleware(key) {
        return Middleware.getMiddleware(key);
    }

    response(req, res, next) {
        res.$respond = new Response(res).$respond;
        res.$response = new Response(res);
        next();
    }
}

export const RouterInstance = new Router();
const router = RouterInstance.router;
export default router;
