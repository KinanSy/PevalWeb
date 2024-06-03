const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// Définir le modèle Teacher
const Teacher = sequelize.define('Teacher', {
  id_teacher: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  teaFirstname: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  teaLastname: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  teaUsername: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true 
  },
  teaPassword: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Teacher',
  tableName: 'Teacher',
  timestamps: false
});

module.exports = Teacher;

// Synchroniser le modèle avec la base de données
async function syncModel() {
  try {
    await Teacher.sync();
    console.log('Modèle Teacher synchronisé avec succès.');
  } catch (error) {
    console.error('Erreur de synchronisation du modèle Teacher :', error);
  }
}

syncModel();
