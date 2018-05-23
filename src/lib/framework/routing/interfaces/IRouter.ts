import {Router, IRouter as CoreIRouter} from 'express-serve-static-core';

interface GroupConfig {
    prefix?: string;
    middleware?: any
}
export interface IRouter extends Router{
    group?(config: GroupConfig, callback: Function): any;
};
