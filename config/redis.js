module.exports = {
    development: {
        host: '127.0.0.1',
        port: 6379,
    },
    staging: process.env.REDIS_URL,
    production: process.env.REDIS_URL,
};
