const express = require('express');
const CONTROLERS = require('./controlers.js');
const router = express.Router();

router.post('/Vendedor', CONTROLERS.cadastrarVendedor);
router.get('/usuarios', CONTROLERS.buscarUsuarios);

module.exports = router;