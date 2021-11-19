'use-strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const produtoRouter = require('../routes/produto-route');
const usuarioRouter = require('../routes/usuario-route');


app.use(bodyParser.json());

app.use('/api/produtos', produtoRouter)
app.use('/api/usuario', usuarioRouter)


module.exports = app;