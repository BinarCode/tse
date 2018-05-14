import {Router} from 'express-serve-static-core';

export interface IRouter extends Router {
    group?: Function;
};
