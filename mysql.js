const mysql = require('mysql')


var pool = mysql.createPool({

  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "estoque"
})

//Necessário para conseguir acessar o pool fora do arquivo
exports.pool = pool;



// const mysql = require ('mysql')

// var pool =mysql.createPool({

//   host:"localhost",
//   port:"3306",
//   user:"root",
//   password:"root",
//   database:"estoque"
// })

// //Necessario para conseguir acessar o pool fora do arquivo
// exports.pool = pool;
