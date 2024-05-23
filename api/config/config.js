// var fs = require('fs');
// var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
require('dotenv').config();
const port = process.env.PORT
// var config = {
//     "development": {
//         "username": process.env.USERNAME,
//         "password": process.env.PASSWORD,
//         "database": process.env.DATABASE,
//         "host": process.env.HOST,
//         "dialect": "mysql"
//     },
//     "test": {
//         "username": process.env.USERNAME,
//         "password": process.env.PASSWORD,
//         "database": process.env.DATABASE,
//         "host": process.env.HOST,
//         "dialect": "mysql"
//     },
//     "production": {
//         "username": process.env.USERNAME,
//         "password": process.env.PASSWORD,
//         "database": process.env.DATABASE,
//         "host": process.env.HOST,
//         "dialect": "mysql"
//     }
// }
var config = {
    "development": {
      "username": "root",
      "password": "root",
      "database": "pevalweb",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": "root",
      "database": "pevalweb",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": "root",
      "database": "pevalweb",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  

module.exports = config;