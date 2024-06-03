const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Définir le modèle Objective
const Objective = sequelize.define('Objective', {
  id_objective: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  objTitle: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  objWeight: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true
  },
  objComment: {
    type: DataTypes.STRING(512),
    allowNull: true
  },
  objEvaluationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Evaluation',
      key: 'id_evaluation'
    }
  }
}, {
  tableName: 'Objective',
  timestamps: false 
});

// Définir les associations du modèle Objective
Objective.associate = models => {
  Objective.hasMany(models.Criterion, {
    as: 'criterions',
    foreignKey: 'criObjectiveId'
  });
};

module.exports = Objective;

// Synchroniser le modèle avec la base de données
async function syncModel() {
  try {
    await Objective.sync();
    console.log('Modèle Objective synchronisé avec succès.');
  } catch (error) {
    console.error('Erreur de synchronisation du modèle Objective :', error);
  }
}

syncModel();
