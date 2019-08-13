import redis from 'redis';
import bluebird from 'bluebird';
import config from '../config/index';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(config.redis);

export default client;
