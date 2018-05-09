import * as mongoose from 'mongoose';
import { config } from '../../config/env';
const configs = config.default;
const conn = mongoose.connection;
const connectionString = `mongodb://${configs.DB_HOST}:${configs.DB_PORT}/${configs.DB_DATABASE}`;
conn.on('error', function(err) {
    console.error('mongodb connection error:', err);
    process.exit(1);
});

conn.once('open', function() {
    console.info('Connected to Mongodb.');
});
console.log(`Connecting to ${connectionString} ...`);
mongoose.connect(connectionString, configs.DB_OPTIONS);
export default conn;
