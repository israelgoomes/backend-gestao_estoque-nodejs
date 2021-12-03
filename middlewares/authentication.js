'use-strict'

const jwt = require("jsonwebtoken")
const variables = require('../bin/configuration/variables')


module.exports = async (req, res, next) => {

  let token = req.body.token || req.query.query || req.headers['user-token']

  if (token) {
    try {

      //o decoded vai validar o token
      let decoded = await jwt.verify(token, variables.Security.secreteKey)
      next();
    } catch (error) {
      res.status(401).send({ message: "O token informado é inválido!" });
    }

  } else {
    res.status(401).send({ message: "Você precisa utilizar um token para acessar esse recurso." });;
    return;
  }
}