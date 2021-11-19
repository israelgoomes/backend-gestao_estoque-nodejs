'use-strict'

const express = require("express")
const router = express.Router();
const produtoController = require('../controllers/produto-controller');
const produto = new produtoController();


router.get('/', produto.listarProdutos)
router.get('/:idUsuario', produto.listarProdutosUsuario)
router.get('/:idProduto/:idUsuario', produto.listarPorIdProduto)
router.delete('/:idProduto', produto.deletaProduto)
router.put('/', produto.atualizaProduto)
router.post('/', produto.insereProduto)


module.exports = router;