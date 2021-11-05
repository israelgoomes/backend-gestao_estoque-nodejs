'use-strict'

const express = require('express');
const app = express();
const http = require('http').Server(app);
const mysql = require('./mysql').pool;
const bodyParser = require('body-parser');

app.use(bodyParser.json());


http.listen(3000, () => {
  console.info("Api do sistema de gestão de estoque inicilizada com sucesso!");
})


app.use('/listar-produtos', (req, res) => {

  let sql = "select * from tb_produtos"

  mysql.getConnection((error, conn) => {
    if (error) throw error;
    conn.query(
      sql,
      async (error, results, fields) => {
        if (error) {
          console.log("Error: ", error);
          return await res.json(error);
        } else {
          await res.json(results);
          return conn.release();
        }
      }, (error) => {
        console.log(error);
      })
  }
  )
})


app.use('/listar-produtos-usuario/:idUsuario', (req, res) => {

  let sql = `select * from tb_produtos where cd_usuario = ${req.params.idUsuario}`

  mysql.getConnection((error, conn) => {
    if (error) throw error;
    conn.query(
      sql,
      async (error, results, fields) => {
        if (error) {
          console.log("Error: ", error);
          return await res.json(error);
        } else {
          await res.json(results);
          return conn.release();
        }
      }, (error) => {
        console.log(error);
      })
  }
  )
})


app.use('/listar-produto-usuario/:idUsuario/:idProduto', (req, res) => {

  let sql = `select * 
            from tb_produtos 
            where cd_usuario = ${req.params.idUsuario}
            and cd_produto = ${req.params.idProduto}`

  mysql.getConnection((error, conn) => {
    if (error) throw error;
    conn.query(
      sql,
      async (error, results, fields) => {
        if (error) {
          console.log("Error: ", error);
          return await res.json(error);
        } else {
          await res.json(results);
          return conn.release();
        }
      }, (error) => {
        console.log(error);
      })
  }
  )
})


app.use('/deleta-produto/:idProduto', (req, res) => {

  let sql = `delete from tb_produtos 
             where cd_produto = ${req.params.idProduto};`

  mysql.getConnection((error, conn) => {
    if (error) throw error;
    conn.query(
      sql,
      async (error, results, fields) => {
        if (error) {
          console.log("Error: ", error);
          return await res.json(error);
        } else {
          await res.send("Produto excluído com sucesso!");
          return conn.release();
        }
      }, (error) => {
        console.log(error);
      })
  }
  )
})




app.use('/teste-body-parser', (req, res) => {
  res.send(`Bem vindo! ${req.body.nome}`);
  // res.send("Listando o produto que possui o ID " + req.params.id);
})