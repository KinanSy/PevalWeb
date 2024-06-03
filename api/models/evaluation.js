const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Définir le modèle Evaluation
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

// Définir les associations du modèle Evaluation
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

// Synchroniser le modèle avec la base de données
async function syncModel() {
  try {
    await Evaluation.sync();
    console.log('Modèle Evaluation synchronisé avec succès.');
  } catch (error) {
    console.error('Erreur de synchronisation du modèle Evaluation :', error);
  }
}

syncModel();
