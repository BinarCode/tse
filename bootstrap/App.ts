require('dotenv').config({ path: process.env.DOTENV || '.env' });
require('@utils/cli');
require('@utils/helpers');
import helmet from 'helmet';
import * as path from 'path';
import express from 'express';
import noop from 'lodash/noop';
import i18next from 'i18next';
import BPromise from 'bluebird';
import errorHandler from 'errorhandler';
import Authenticate from '@middleware/Authenticate';
import i18nFilesystem from 'i18next-node-fs-backend';
import i18nextMiddleware from 'i18next-express-middleware';
import GenericException from '@exceptions/GenericException';
import sequelize from './database';
import { RouterInstance } from './Router';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.express.disable('x-powered-by');
        this.express.use(express.static('public'));
        this.express.use(RouterInstance.router);
        /**
         * Security
         */
        this.express.use(helmet());
        this.express.use(errorHandler);
        this.express.use(GenericException);
    }

    async database() {
        await sequelize
            .authenticate()
            .then(() => {
                $success(
                    'Database connection has been established successfully.'
                );
            })
            .catch(err => {
                $error('Unable to connect to the database:', err);
            });
    }

    async server() {
        try {
            /** @type {Server} */
            const port = process.env.PORT || 5000;
            const http = await this.express.listen(port, noop);
            $success(`[p ${process.pid}] Listening at port ${port}`);
            process.on('uncaughtException', error => {
                $logger(error, 'error');
            });
            /**
             * From promises
             */
            process.on('unhandledRejection', error => {
                $logger(error, 'error');
            });
        } catch (e) {
            $error(e.message);
            process.exit(1);
        }
    }

    routes() {
        require(path.join(__dirname, '../routes/api'));
    }

    i18n() {
        // @ts-ignore
        i18next.use(i18nFilesystem).use(i18nextMiddleware.LanguageDetector);
        return i18next.init(
            {
                fallbackLng: 'en',
                ns: ['en.json'],
                defaultNS: 'en.json',
                lng: 'en',
                debug: process.env.DEBUG_I18 === 'true',
                keySeparator: false,
                backend: {
                    loadPath: path.join(
                        __dirname,
                        '../storage/translations/en.json'
                    ),
                },
            },
            () => {}
        );
    }

    run() {
        return new BPromise(async (resolve, reject) => {
            try {
                await this.server();
                await this.database();
                Authenticate.initialize();
                await this.i18n();
                this.routes();
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }
}

export default new App();
