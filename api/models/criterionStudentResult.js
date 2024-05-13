const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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

module.exports = CriterionStudentResult;

async function syncModel() {
    await CriterionStudentResult.sync();
}

syncModel();

