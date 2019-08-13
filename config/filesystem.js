import path from 'path';

export default {
    driver: process.env.FILESYSTEM_DRIVER || 'local',
    drivers: {
        local: {
            root: path.resolve(__dirname, '..', 'storage', 'files'),
        },
        gcs: {
            root: 'gcs',
            project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
            bucket: process.env.GOOGLE_CLOUD_STORAGE_BUCKET,
            path_prefix: process.env.GOOGLE_CLOUD_STORAGE_PATH_PREFIX,
            storage_api_uri: process.env.GOOGLE_CLOUD_STORAGE_API_URI,
            storage_static_base_url: process.env.FILESYSTEM_STATIC_BASE_URL,
        },
    },
};
