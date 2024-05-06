const Sequelize = require('sequelize');
const config = require("config.js")

module.exports = new Sequelize(config["development"]["database"],config["development"]["username"],config["development"]["password"],config["development"]["database"],{
    host: config["development"]["host"],
    dialect: config["development"]["dialect"]
});