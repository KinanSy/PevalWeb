const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
    type: DataTypes.DECIMAL(4, 2), // Updated to DECIMAL(4, 2)
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

Objective.associate = models => {
  Objective.hasMany(models.Criterion, {
    as: 'criterions',
    foreignKey: 'criObjectiveId'
  });
};

module.exports = Objective;

async function syncModel() {
    await Objective.sync();
}
syncModel();
