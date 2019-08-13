const path = require('path');
require('./cli');
require('./logger');

// global.$assets_path = (relativePath = '') => {
//     if (relativePath) {
//         relativePath = `/${relativePath}`
//     }
//     return path.resolve(`./assets${relativePath}`)
// }
/*

global.$storage_path = (relativePath = '') => {
    if (relativePath) {
        relativePath = `/${relativePath}`
    }
    return path.resolve(`./storage${relativePath}`)
}

global.$view = (relativePath = '') => {
    if (relativePath) {
        relativePath = `/${relativePath}`
    }
    return path.resolve(`./views/${relativePath}`)
}
*/
