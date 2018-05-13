import * as mongoose from 'mongoose';
import log from '../cli/chalk';

export default {
    connect: database => {
        const connectionString = `mongodb://${database.DB_HOST}:${database.DB_PORT}/${database.DB_DATABASE}`;
        mongoose.connection.on('error', err => {
            console.error('mongodb connection error:', err);
            process.exit(1);
        });
        mongoose.connection.once('open', () => {
            log.warning('Connected to Mongodb.');
        });

        mongoose.connect(connectionString, database.DB_OPTIONS);
        log.success(`Connecting to ${connectionString} ...`);
    }
};
