'use-strict'

const express = require('express');
const app = express();
const http = require('http').Server(app);


http.listen(3000, () => {
  console.info("Api do sistema de gestão de estoque inicilizada com sucesso!");
})

app.use('/bem-vindo/:nome', (req, res) => {
  res.send("Bem vindo ao sistema de gestão de estoque, " + req.params.nome);
})

app.use('/lista-produtos/:id', (req, res) => {
  res.send(`Listando o produto que possui o ID ${req.params.id}`);
  // res.send("Listando o produto que possui o ID " + req.params.id);
})