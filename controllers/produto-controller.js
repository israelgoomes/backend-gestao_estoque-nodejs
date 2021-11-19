'use-strict'

const mysql = require('../mysql').pool;

class ProutoController {


  async listarProdutos(req, res) {
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
    })
  }

  async listarProdutosUsuario(req, res) {
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
  }

  async listarPorIdProduto(req, res) {
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
  }

  async deletaProduto(req, res) {
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
    });
  }

  async atualizaProduto(req, res) {
    let sql = `UPDATE tb_produtos
    SET nm_produto = "${req.body.nmProduto}",
      ds_produto = "${req.body.dsProduto}",
        vl_entrada_produto = ${req.body.vlEntradaProduto},
        vl_saida_produto = ${req.body.vlSaidaProduto},
        qtd_estoque = ${req.body.qtdEstoque},
        fabricante_produto = "${req.body.fabricanteProduto}"
    WHERE cd_produto = ${req.body.cdProduto};`

    mysql.getConnection((error, conn) => {
      if (error) throw error;
      conn.query(
        sql,
        async (error, results, fields) => {
          if (error) {
            console.log("Error: ", error);
            return await res.json(error);
          } else {
            await res.send("Produto atualizado com sucesso!");
            return conn.release();
          }
        }, (error) => {
          console.log(error);
        })
    });
  }

  async insereProduto(req, res) {
    let sql = `INSERT INTO 
    tb_produtos(cd_produto, nm_produto, ds_produto, 
          vl_entrada_produto, vl_saida_produto, 
          qtd_estoque, fabricante_produto, 
                dt_criacao_produto, cd_usuario, cd_fornecedor)
    values(null, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

    mysql.getConnection((error, conn) => {
      if (error) throw error;
      conn.query(
        sql,
        [
          req.body.nmProduto,
          req.body.dsProduto,
          req.body.vlEntradaProduto,
          req.body.vlSaidaProduto,
          req.body.qtdEstoque,
          req.body.fabricanteProduto,
          req.body.dtCriacaoProduto,
          req.body.cdUsuario,
          req.body.cdFornecedor
        ],
        async (error, results, fields) => {
          if (error) {
            console.log("Error: ", error);
            return await res.json(error);
          } else {
            await res.status(201).send({
              mensagem: "Produto inserido com sucesso!",
              idProduto: results.insertId
            });
            //return conn.release();
          }
        }, (error) => {
          console.log(error);
        })
    });
  }



}

module.exports = ProutoController;