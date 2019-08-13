require('./bootstrap/aliases');

import App from './bootstrap/App';
App.run().catch(error => {
    console.error(error.stack);
    process.exit();
});
