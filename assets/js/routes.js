const express = require('express');
const CONTROLERS = require('./controlers.js');
const router = express.Router();

router.post('/Vendedor', CONTROLERS.cadastrarVendedor);
router.post('/login', CONTROLERS.login);
router.post('/Veiculo', CONTROLERS.cadastrarVeiculo);
router.post('/Cliente', CONTROLERS.cadastrarCliente);
router.post('/Montadora', CONTROLERS.cadastrarMontadora); 

module.exports = router;