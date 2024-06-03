const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Définir le modèle Module
const Module = sequelize.define('Module', {
  id_module: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  modTitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  modNumber: {
    type: DataTypes.SMALLINT.UNSIGNED,
    allowNull: false,
  }
}, {
  modelName: 'Module',
  tableName: '_Module',
  timestamps: false,
});

module.exports = Module;

// Synchroniser le modèle avec la base de données
async function syncModel() {
  try {
    await Module.sync();
    console.log('Modèle Module synchronisé avec succès.');
  } catch (error) {
    console.error('Erreur de synchronisation du modèle Module :', error);
  }
}

syncModel();
