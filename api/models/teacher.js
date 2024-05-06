const { DataTypes } = require('sequelize');
const sequalize = require('../config/database');
const Teacher = sequalize.define('Teacher', {
    id_teacher: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    teaFirstname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    teaLastname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    teaUsername: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true 
    },
    teaPassword: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequalize,
    modelName: 'Teacher',
    tableName: 'Teacher',
    timestamps: false
});

async function syncModel() {
    await Teacher.sync();
  }
  
syncModel();
// sequelize model:generate --name Teacher --attributes id_teacher:integer,teaFirstname:string,teaLastname:string,teaUsername:string,teaPassword:string
module.exports = Teacher;