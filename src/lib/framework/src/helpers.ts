// Test pentru visualizare
const globalConfig = {};
const env = (key = '') => {
    if (key !== '') {
        return globalConfig[key];
    }
    return undefined;
};
export const helpers = {
    env
};
