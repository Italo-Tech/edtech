require('dotenv').config()
require('express-async-errors');
require('./database/index')
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const routes = require('./routes')
const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

/* Rotas */
app.use(routes)

const PORT = process.env.PORT ||  8080;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
