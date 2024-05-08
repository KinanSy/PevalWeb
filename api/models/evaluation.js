const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/*
CREATE TABLE Evaluation(
   id_evaluation INT,
   evaTitle VARCHAR(255),
   evaDescription VARCHAR(1024),
   evaWeight DECIMAL(2,2),
   evaDate DATE,
   evaLocation VARCHAR(50),
   id_teacher INT NOT NULL,
   id_module INT NOT NULL,
   PRIMARY KEY(id_evaluation),
   FOREIGN KEY(id_teacher) REFERENCES Teacher(id_teacher),
   FOREIGN KEY(id_module) REFERENCES _Module(id_module)
);

*/
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
    type: DataTypes.DECIMAL(2,2),
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
  teacherId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'teacher',
      key: 'id_teacher'
    }
  },
  moduleId: {
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

// Associations
Evaluation.associate = (models) => {
  Evaluation.belongsTo(models._Module,{as: 'Evaluation', foreignKey: 'id_module'})
  Evaluation.belongsTo(models.Teacher,{as: 'Evaluation', foreignKey: 'id_teacher'})
  
}

async function syncModel() {
  await Evaluation.sync();
}

syncModel();
