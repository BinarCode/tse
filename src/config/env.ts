import * as path from 'path';
export const config = require(path.format({
    dir: __dirname,
    name: process.env.NODE_ENV || 'dev',
    ext: '.ts'}));
