const Sequelize = require('sequelize');
import config from '../config/index';
console.log(config.db);
const sequelize = new Sequelize(config.db);
export default sequelize;
