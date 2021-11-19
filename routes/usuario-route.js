'use-strict'

const express = require("express")
const router = express.Router();
const usuarioController = require('../controllers/usuario-controller');
const usuario = new usuarioController();


router.post("/", usuario.cadastraUsuario);
router.post("/autentica-usuario", usuario.autenticaUsuario);


module.exports = router;