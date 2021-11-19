'use-strict'


const app = require('./bin/express')
const http = require('http').Server(app);


http.listen(3000, () => {
  console.info("Api do sistema de gestão de estoque inicilizada com sucesso!");
})


