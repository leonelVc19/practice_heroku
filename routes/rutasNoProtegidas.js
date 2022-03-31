const express = require('express');

const router = express.Router();

const sesionController = require('../controllers/SesionController');
const usuariosController = require('../controllers/UsuariosController');
const passwordController = require('../controllers/PasswordController');

module.exports = function() {
  // rutas que no requieren autenticacion
  router.post('/login', sesionController.login);
  router.post('/users', usuariosController.add);
  router.post('/recuperar-password', passwordController.resetPassword);
  router.post('/validar-token', passwordController.validationToken);
  router.post('/actualizar-password', passwordController.SaveNewPassword);
  return router;
};