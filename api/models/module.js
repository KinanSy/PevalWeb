const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Module = sequelize.define('Module', {
  id_module: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  modTitle: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  modNumber: {
    type: DataTypes.TINYINT,
    allowNull: false,
  }
}, {
  modelName: 'Module',
  tableName: '_Module',
  timestamps: false,
});
module.exports = Module;
async function syncModel() {
  await Module.sync();
}

syncModel();
