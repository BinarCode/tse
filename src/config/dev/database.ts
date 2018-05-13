import env from '../env';
export default {
    'DB_CONNECTION': env.DB_CONNECTION || 'mongo',
    'DB_HOST':  env.DB_HOST || 'localhost',
    'DB_PORT': env.DB_PORT || '27017',
    'DB_DATABASE': env.DB_DATABASE || 'node-ts',
    'DB_USERNAME': env.DB_USERNAME || '',
    'DB_PASSWORD': env.DB_PASSWORD || '',
    'DB_OPTIONS': env.DB_OPTIONS || {}
};
