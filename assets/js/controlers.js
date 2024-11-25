const SERVICES = require('./services.js');


module.exports.cadastrarVendedor = async (req, res) => {
    let json = { error: '', result: {} };
    let { usuario, senha } = req.body;

    if (usuario && senha) {
        try {
            let usuarioCodigo = await SERVICES.inserirVendedor(usuario, senha);
            json.result = {
                codigo: usuarioCodigo,
                usuario
            };
            res.json(json);
        } catch (error) {
            console.error('Erro ao cadastrar Vendedor:', error); 
            json.error = 'Erro ao cadastrar Vendedor: ' + error.message; 
            res.status(500).json(json);
        }
    } else {
        json.error = 'Campos não enviados';
        res.status(400).json(json); 
    }
};

// Exemplo de uso da função buscarUsuarios
    module.exports.login = async (req, res) => {
        const { usuario, senha } = req.body;  // Desestruturando os dados enviados no corpo da requisição

        try {
            // Buscando o usuário com a senha diretamente no banco de dados
            const usuarioEncontrado = await SERVICES.buscarUsuarioPorNomeESenha(usuario, senha);

            // Se o usuário não for encontrado ou a senha não for correta
            if (!usuarioEncontrado) {
                return res.status(404).json({ error: 'Usuário ou senha incorretos' });
            }

            // Se o login for bem-sucedido, pode retornar um token de autenticação ou outras informações do usuário
            return res.json({ success: true, message: 'Login realizado com sucesso', usuario: usuarioEncontrado });

        } catch (error) {
            console.error('Erro ao realizar login:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    };


module.exports.cadastrarVeiculo = async (req, res) => {
    let json = { error: '', result: {} };
    let { chassi, placa, marca, modelo, anoFabricacao, anoModelo, cor, valor } = req.body;

    if (chassi && placa && marca && modelo && anoFabricacao && anoModelo && cor && valor) {
        try {
            let veiculoCodigo = await SERVICES.inserirVeiculo(chassi, placa, marca, modelo, anoFabricacao, anoModelo, cor, valor);
            json.result = {
                codigo: veiculoCodigo,
                chassi,
                placa,
                marca
            };
            res.json(json);
        } catch (error) {
            console.error('Erro ao cadastrar Veículo:', error); 
            json.error = 'Erro ao cadastrar Veículo: ' + error.message; 
            res.status(500).json(json);
        }
    } else {
        json.error = 'Campos não enviados';
        res.status(400).json(json); 
    }
};

module.exports.cadastrarCliente = async (req, res) => {
    let json = { error: '', result: {} };
    let { cpf, nome, bairro, cidade, estado, telefone, celular, renda } = req.body;

    if (cpf && nome && bairro && cidade && estado && telefone && celular && renda) {
        try {
            let clienteCodigo = await SERVICES.inserirCliente(cpf, nome, bairro, cidade, estado, telefone, celular, renda);
            json.result = {
                codigo: clienteCodigo,
                nome
            };
            res.json(json);
        } catch (error) {
            console.error('Erro ao cadastrar Cliente:', error); 
            json.error = 'Erro ao cadastrar Cliente: ' + error.message; 
            res.status(500).json(json);
        }
    } else {
        json.error = 'Campos não enviados';
        res.status(400).json(json); 
    }
};

module.exports.cadastrarMontadora = async (req, res) => {
    let json = { error: '', result: {} };
    let { cnpj, razaoSocial, marca, contato, telefoneComercial, celular } = req.body;

    if (cnpj && razaoSocial && marca && contato && telefoneComercial && celular) {
        try {
            let montadoraCodigo = await SERVICES.inserirMontadora(cnpj, razaoSocial, marca, contato, telefoneComercial, celular);
            json.result = {
                codigo: montadoraCodigo,
                cnpj,
                razaoSocial
            };
            res.json(json);
        } catch (error) {
            console.error('Erro ao cadastrar Montadora:', error); 
            json.error = 'Erro ao cadastrar Montadora: ' + error.message; 
            res.status(500).json(json);
        }
    } else {
        json.error = 'Campos não enviados';
        res.status(400).json(json); 
    }
};

module.exports.buscarCliente = async (req, res) => {
    const { nomeOuCpf } = req.params;

    let json = { error: '', result: {} };

    try {
        let cliente = await SERVICES.buscarClientePorNomeOuCpf(nomeOuCpf);

        if (cliente) {
            json.result = cliente;
            return res.json(json); // Retorna um JSON válido
        } else {
            json.error = `Cliente não encontrado com o nome ou CPF: ${nomeOuCpf}`;
            return res.status(404).json(json); // Retorna um JSON de erro com status 404
        }
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        json.error = `Erro ao buscar cliente: ${error.message}`;
        return res.status(500).json(json);  // Retorna um JSON com status 500 em caso de erro
    }
};

module.exports.atualizarCliente = async (req, res) => {
    let { cpf, nome, bairro, cidade, estado, telefone, celular, renda, senha } = req.body;  // Recebe os dados do corpo da requisição
    let { nomeOuCpf } = req.params;  // Recebe o nome ou CPF da URL (usado para buscar o cliente)

    let json = { error: '', result: {} };

    // Verificando se todos os campos obrigatórios estão presentes
    if (!nome || !bairro || !cidade || !estado || !telefone || !celular || !renda || !senha) {
        json.error = 'Todos os campos são obrigatórios, incluindo a senha para confirmação!';
        return res.status(400).json(json);
    }

    if (!cpf) {
        json.error = 'CPF do cliente é obrigatório';
        return res.status(400).json(json); // CPF não fornecido no corpo da requisição
    }

    try {
        // Buscar o cliente pelo nome ou CPF
        let cliente = await SERVICES.buscarClientePorNomeOuCpf(nomeOuCpf);

        if (!cliente) {
            json.error = `Cliente não encontrado com o nome ou CPF: ${nomeOuCpf}`;
            return res.status(404).json(json); // Cliente não encontrado
        }

        // Atualizar o cliente encontrado
        let result = await SERVICES.atualizarCliente(cliente.cpf, nome, bairro, cidade, estado, telefone, celular, renda);

        if (result > 0) {  // Verifique se afetou alguma linha
            json.result = { cpf: cliente.cpf, nome: cliente.nome };
            return res.json(json);  // Cliente atualizado com sucesso
        } else {
            json.error = `Cliente com CPF ${cliente.cpf} não encontrado ou nenhum dado alterado.`;
            return res.status(404).json(json);
        }
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        json.error = `Erro ao atualizar cliente: ${error.message}`;
        return res.status(500).json(json);  // Erro no servidor
    }
};


module.exports.listarVeiculos = async (req, res) => {
    let json = { error: '', result: [] };

    try {
        // Chama a função que busca todos os veículos disponíveis
        let veiculos = await SERVICES.listarVeiculosDisponiveis();

        if (veiculos.length > 0) {
            json.result = veiculos;
            return res.json(json);  // Retorna os veículos disponíveis em formato JSON
        } else {
            json.error = 'Nenhum veículo disponível para venda.';
            return res.status(404).json(json);  // Retorna erro 404 caso não haja veículos
        }
    } catch (error) {
        console.error('Erro ao listar veículos:', error);
        json.error = `Erro ao listar veículos: ${error.message}`;
        return res.status(500).json(json);  // Retorna erro 500 em caso de falha no servidor
    }
};

module.exports.listarMontadorasParceiras = async (req, res) => {
    let json = { error: '', result: [] };

    try {
        // Chama a função para listar as montadoras
        let montadoras = await SERVICES.listarMontadoras();

        if (montadoras && montadoras.length > 0) {
            json.result = montadoras;
            return res.json(json);  // Retorna as montadoras parceiras em formato JSON
        } else {
            json.error = 'Nenhuma montadora parceira encontrada.';
            return res.status(404).json(json);  // Retorna erro 404 se não encontrar montadoras
        }
    } catch (error) {
        console.error('Erro ao listar montadoras parceiras:', error);
        json.error = `Erro ao listar montadoras: ${error.message}`;
        return res.status(500).json(json);  // Retorna erro 500 em caso de falha no servidor
    }
};

module.exports.registrarVenda = async (req, res) => {
    let json = { error: '', result: {} };
    let { clienteCpf, vendedorCodigo, veiculoChassi, valorEntrada, valorFinanciado, valorTotal } = req.body;

    // Verificando se todos os dados obrigatórios foram fornecidos
    if (!clienteCpf || !vendedorCodigo || !veiculoChassi || !valorEntrada || !valorFinanciado || !valorTotal) {
        json.error = 'Todos os campos são obrigatórios';
        return res.status(400).json(json); // Retorna erro 400 caso algum campo obrigatório esteja ausente
    }

    try {
        // Verificando se o cliente existe
        let cliente = await SERVICES.buscarClientePorNomeOuCpf(clienteCpf);
        if (!cliente) {
            json.error = `Cliente com CPF ${clienteCpf} não encontrado.`;
            return res.status(404).json(json); // Retorna erro 404 se o cliente não for encontrado
        }

        // Verificando se o vendedor existe
        let vendedor = await SERVICES.buscarVendedorPorCodigo(vendedorCodigo);
        if (!vendedor) {
            json.error = `Vendedor com código ${vendedorCodigo} não encontrado.`;
            return res.status(404).json(json); // Retorna erro 404 se o vendedor não for encontrado
        }

        // Verificando se o veículo existe e está disponível para venda
        let veiculo = await SERVICES.buscarVeiculoPorChassi(veiculoChassi);
        if (!veiculo) {
            json.error = `Veículo com chassi ${veiculoChassi} não encontrado.`;
            return res.status(404).json(json); // Retorna erro 404 se o veículo não for encontrado
        }

        // Inserir a venda no banco de dados
        let data = new Date().toISOString().split('T')[0]; // Data no formato 'YYYY-MM-DD'
        let vendaId = await SERVICES.inserirVenda(data, clienteCpf, vendedorCodigo, veiculoChassi, valorEntrada, valorFinanciado, valorTotal);

        // Retorna a resposta com o ID da venda registrada
        json.result = { vendaId, clienteCpf, vendedorCodigo, veiculoChassi, valorEntrada, valorFinanciado, valorTotal };
        return res.json(json); // Retorna sucesso com os dados da venda registrada
    } catch (error) {
        console.error('Erro ao registrar venda:', error);
        json.error = `Erro ao registrar venda: ${error.message}`;
        return res.status(500).json(json); // Retorna erro 500 em caso de falha no servidor
    }
};
