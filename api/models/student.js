const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Définir le modèle Student
const Student = sequelize.define('Student', {
  id_student: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  stuFirstname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  stuLastname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  stuToken: {
    type: DataTypes.STRING(100),
    allowNull: true,
  }
}, {
  modelName: 'Student',
  tableName: 'Student',
  timestamps: false,
});

module.exports = Student;

// Synchroniser le modèle avec la base de données
async function syncModel() {
  try {
    await Student.sync();
    console.log('Modèle Student synchronisé avec succès.');
  } catch (error) {
    console.error('Erreur de synchronisation du modèle Student :', error);
  }
}

syncModel();
