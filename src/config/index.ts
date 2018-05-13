import * as path from 'path';
export const config = require(path.format({
    dir: __dirname + '/' + process.env.NODE_ENV || 'dev',
    name: 'entry',
    ext: '.ts'}));
