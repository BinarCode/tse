import * as path from 'path';
const logPath = path.join(__dirname, '../../logs/development.log');

export default {
    web: {
        port: 3000,
    },
    logging: {
        appenders: [{ type: 'console' }, { type: 'file', filename: logPath }],
    },
};
