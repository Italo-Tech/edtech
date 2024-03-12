const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database');

const Students = require('../models/Students');

const connection = new Sequelize(dbConfig);

/*Conexão tabelas DB*/
Students.init(connection);

module.exports = connection;
