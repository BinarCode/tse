import * as path from 'path';
import router from '@bootstrap/Router';

require('require-all')({
    dirname: path.resolve(__dirname, 'Api/v1'),
    filter: /(.+)\.(ts|js)/,
    recursive: true,
});

router.use('*', (req, res) => {
    return res.status(404).send(`No such route`);
});
