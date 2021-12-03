'use-strict'

const mysql = require('../mysql').pool;
const md5 = require('md5');
const jwt = require('jsonwebtoken')
const variables = require('../bin/configuration/variables');

class UsuarioController {


  async cadastraUsuario(req, res) {
    let _hash = md5(req.body.senhaUsuario);

    let sql = `CALL proc_cadastro_usuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    mysql.getConnection((error, conn) => {
      if (error) throw error;
      conn.query(
        sql,
        [
          req.body.nmUsuario,
          req.body.enderecoUsuario,
          req.body.cidadeUsuario,
          req.body.bairroUsuario,
          req.body.cepUsuario,
          req.body.telUsuario,
          _hash,
          req.body.emailUsuario,
          req.body.dtCriacaoUsuario,
          req.body.ativoUsuario,
          req.body.icCpfCnpjUsuario
        ],
        async (error, results, fields) => {
          if (error) {
            console.log("Error: ", error);
            return await res.json(error);
          } else {
            await res.status(201).send({
              mensagem: results[0][0].RESPOSTA,
              idUsuario: results[0][0].insertId
            });
            //return conn.release();
          }
        }, (error) => {
          console.log(error);
        })
    })
  }

  async autenticaUsuario(req, res) {
    let sql = `CALL proc_autentica_usuario(?, ?);`;
    let _hash = md5(req.body.senhaUsuario);

    mysql.getConnection((error, conn) => {
      if (error) throw error;
      conn.query(
        sql,
        [
          req.body.cpfCnpj,
          _hash,
        ],
        async (error, results, fields) => {
          if (error) {
            console.log("Error: ", error);
            return await res.json(error);
          } else {
            //COD 1 = SUCESSO
            //COD 2 = SENHA INVÁLIDA
            //COD 3 = USUÁRIO NÃO CADASTRADO

            if (results[1][0].COD_RESPOSTA != 1) {
              await res.status(201).send({
                mensagem: results[1],
              });
            } else {

              await res.status(201).send({
                mensagem: results[1],
                token: jwt.sign({ user: results[1][0].NM_USUARIO }, variables.Security.secreteKey)
              });
            }
            //return conn.release();
          }
        }, (error) => {
          console.log(error);
        })
    })

  }

}

module.exports = UsuarioController;