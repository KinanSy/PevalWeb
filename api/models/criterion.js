const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Criterion = sequelize.define('Criterion', {
  id_criterion: {
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
    type: DataTypes.DECIMAL(4, 2), // Updated to DECIMAL(4, 2)
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
  criObjectiveId: {
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

Criterion.associate = models => {
  Criterion.hasMany(models.CriterionStudentResult, {
      as: 'criterionResults',
      sourceKey: 'id_criterion',
      foreignKey: 'csrCriterionId'
  });
  Criterion.belongsTo(models.Objective, {
    as: 'objective',
    foreignKey: 'criObjectiveId'
  });
};

module.exports = Criterion;

async function syncModel() {
    await Criterion.sync();
}

syncModel();
