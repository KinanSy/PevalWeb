const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Criterion = sequelize.define('Criterion', {
  id_criteria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  criTitle: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  criConditionsDescription: {
    type: DataTypes.STRING(512),
    allowNull: true
  },
  criExpectationDescription: {
    type: DataTypes.STRING(512),
    allowNull: true
  },
  criWeight: {
    type: DataTypes.DECIMAL(2,2),
    allowNull: true
  },
  criLevel0Description: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  criLevel1Description: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  criLevel2Description: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  criLevel3Description: {
    type: DataTypes.STRING(1000),
    allowNull: true
  },
  id_objective: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Objective', 
      key: 'id_objective'
    }
  }
}, {
  tableName: 'Criterion',
  timestamps: false 
});

async function syncModel() {
    await Criterion.sync();
}

syncModel();

module.exports = Criterion;
