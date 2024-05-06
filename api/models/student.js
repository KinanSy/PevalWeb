const { DataTypes } = require('sequelize');
const sequalize = require('../config/database');

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
  tableName: 'Students',
  timestamps: false,
});

async function syncModel() {
  await Student.sync();
}

syncModel();
