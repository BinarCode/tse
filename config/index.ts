require('dotenv').config({ path: process.env.DOTENV || '.env' });
import * as path from 'path';
const database = require('./database');
const redis = require('./redis');

const ENV = process.env.NODE_ENV || 'development';

const envConfig = require(path.join(__dirname, 'environments', ENV));
const dbConfig = loadDbConfig();

const config = {
    [ENV]: true,
    env: ENV,
    redis: loadRedisConfig(),
    db: dbConfig,
    ...envConfig,
};

function loadDbConfig() {
    return database[ENV];
}

function loadRedisConfig() {
    return redis[ENV];
}

export default config;
