const express = require('express');
const CONTROLERS = require('./controlers.js');
const router = express.Router();

router.post('/Vendedor', CONTROLERS.cadastrarVendedor);
router.post('/login', CONTROLERS.login);
router.post('/Veiculo', CONTROLERS.cadastrarVeiculo);
router.post('/Cliente', CONTROLERS.cadastrarCliente);
router.post('/Montadora', CONTROLERS.cadastrarMontadora);
router.post('/Venda', CONTROLERS.registrarVenda);
router.post('/Compra', CONTROLERS.registrarCompra);

router.put('/Cliente/:id', CONTROLERS.atualizarCliente);

router.get('/Cliente/buscar/:nomeOuCpf', CONTROLERS.buscarCliente);
router.get('/Veiculos', CONTROLERS.listarVeiculos);
router.get('/Montadoras', CONTROLERS.listarMontadorasParceiras);
module.exports = router;