const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Evaluation = sequelize.define('Evaluation', {
  id_evaluation: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  evaTitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  evaDescription: {
    type: DataTypes.STRING(1024),
    allowNull: true,
  },
  evaWeight: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true,
  },
  evaDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  evaLocation: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  evaTeacherId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'teacher',
      key: 'id_teacher'
    }
  },
  evaModuleId: {
    type: DataTypes.INTEGER,
    references: {
      model: '_module',
      key: 'id_module'
    }
  }
}, {
  modelName: 'Evaluation',
  tableName: 'Evaluation',
  timestamps: false,
});

Evaluation.associate = models => {
  Evaluation.belongsTo(models.Module, {
    as: 'module',
    foreignKey: 'evaModuleId'
  });
  Evaluation.hasMany(models.Objective, {
    as: 'objectives',
    foreignKey: 'objEvaluationId'
  });
};

module.exports = Evaluation;

async function syncModel() {
  await Evaluation.sync();
}

syncModel();
