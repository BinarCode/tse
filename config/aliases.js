const path = require('path');

module.exports = {
    '@root': '.',
    '@components': path.resolve(__dirname, '..', 'src/components'),
    '@events': path.resolve(__dirname, '..', 'src/events'),
    '@bootstrap': path.resolve(__dirname, '../bootstrap'),
    '@exceptions': path.resolve(__dirname, '..', 'src/exceptions'),
    '@interfaces': path.resolve(__dirname, '..', 'src/interfaces'),
    '@middleware': path.resolve(__dirname, '..', 'src/middleware'),
    '@models': path.resolve(__dirname, '..', 'src/models'),
    '@services': path.resolve(__dirname, '..', 'src/services'),
    '@utils': path.resolve(__dirname, '..', 'src/utils'),
    '@src': path.resolve(__dirname, '..', 'src'),
    '@config': path.resolve(__dirname),
};
