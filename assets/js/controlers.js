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
module.exports.buscarUsuarios = async (req, res) => {
    try {
        const usuarios = await SERVICES.buscarUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};
