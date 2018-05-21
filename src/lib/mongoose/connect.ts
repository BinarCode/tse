import * as mongoose from 'mongoose';
import {warn, error, success} from 'tse-shared-utils';

export default {
    connect: database => {
        const connectionString = `mongodb://${database.DB_HOST}:${database.DB_PORT}/${database.DB_DATABASE}`;
        mongoose.connection.on('error', err => {
            error('mongodb connection error:', err);
            process.exit(1);
        });
        mongoose.connection.once('open', () => {
            success('Connected to MongoDB.', `MongoDB`);
        });

        mongoose.connect(connectionString, database.DB_OPTIONS);
        success(`Connecting to ${connectionString} ...`);
    }
};
