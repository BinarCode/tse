require('dotenv').config({ path: process.env.DOTENV || '.env' });
module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    },
    staging: process.env.DATABASE_URL,
    production: process.env.DATABASE_URL,
};
