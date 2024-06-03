const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Définir le modèle CriterionStudentResult
const CriterionStudentResult = sequelize.define('CriterionStudentResult', {
  id_criterionStudentResult: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  csrCriterionId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Criterion',
      key: 'id_criterion'
    }
  },
  csrTeacherId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Teacher',
      key: 'id_teacher'
    }
  },
  csrStudentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Student',
      key: 'id_student'
    }
  },
  csrScore: {
    type: DataTypes.INTEGER
  },
  csrComment: {
    type: DataTypes.STRING(512)
  }
}, {
  tableName: 'CriterionStudentResult',
  timestamps: false
});

// Définir les associations du modèle CriterionStudentResult
CriterionStudentResult.associate = models => {
  CriterionStudentResult.belongsTo(models.Criterion, {
    as: 'criterion',
    foreignKey: 'csrCriterionId'
  });
  CriterionStudentResult.belongsTo(models.Teacher, {
    as: 'teacher',
    foreignKey: 'csrTeacherId'
  });
  CriterionStudentResult.belongsTo(models.Student, {
    as: 'student',
    foreignKey: 'csrStudentId'
  });
};

module.exports = CriterionStudentResult;

// Synchroniser le modèle avec la base de données
async function syncModel() {
  try {
    await CriterionStudentResult.sync();
    console.log('Modèle CriterionStudentResult synchronisé avec succès.');
  } catch (error) {
    console.error('Erreur de synchronisation du modèle CriterionStudentResult :', error);
  }
}

syncModel();