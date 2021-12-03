'use-strict'

const express = require("express")
const router = express.Router();
const produtoController = require('../controllers/produto-controller');
const produto = new produtoController();
const auth = require('../middlewares/authentication');

router.get('/', auth, produto.listarProdutos)
router.get('/:idUsuario', auth, produto.listarProdutosUsuario)
router.get('/:idProduto/:idUsuario', auth, produto.listarPorIdProduto)
router.delete('/:idProduto', auth, produto.deletaProduto)
router.put('/', auth, produto.atualizaProduto)
router.post('/', auth, produto.insereProduto)


module.exports = router;