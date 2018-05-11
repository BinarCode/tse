import chalk from 'chalk';
const logger = console.log;
const error = chalk.bold.red;
const success = chalk.bold.blue;
const warning = chalk.keyword('orange');

export const log = {
    error(msg) {
        logger(error(msg));
    },
    warning(msg) {
        logger(warning(msg));
    },
    success(msg) {
        logger(success(msg));
    }
};

export default log;
