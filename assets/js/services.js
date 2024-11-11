const db = require('./db.js')

module.exports.inserirVendedor = async (usuario, senha) => {
    try {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Vendedor (usuario, senha) VALUES (?, ?)',
                [usuario, senha],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results.insertId);
                }
            );
        });
    } catch (error) {
        throw new Error('Erro ao criar vendedor: ' + error.message);
    }
};

module.exports.buscarUsuarioPorNomeESenha = (usuario, senha) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Vendedor WHERE usuario = ? AND senha = ?';  // Ajuste para buscar usuário com a senha já verificada

        db.query(query, [usuario, senha], (error, results) => {
            if (error) {
                reject(new Error('Erro ao buscar usuário: ' + error.message));  // Se houver erro, rejeita a promessa
                return;
            }

            if (results.length === 0) {
                resolve(null);  // Se não encontrar usuário, resolve com null
                return;
            }

            resolve(results[0]);  // Caso contrário, resolve com o primeiro usuário encontrado
        });
    });
};

module.exports.inserirVeiculo = async (chassi, placa, marca, modelo, anoFabricacao, anoModelo, cor, valor) => {
    try {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Veiculo (numero_chassi, placa, marca, modelo, ano_fabricacao, ano_modelo, cor, valor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
                [chassi, placa, marca, modelo, anoFabricacao, anoModelo, cor, valor], 
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results.insertId);
                }
            );
        });
    } catch (error) {
        throw new Error('Erro ao criar veículo: ' + error.message);
    }
};

module.exports.inserirCliente = async (cpf, nome, bairro, cidade, estado, telefone, celular, renda) => {
    try {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Cliente (cpf, nome, endereco_bairro, endereco_cidade, endereco_estado, telefone_residencial, celular, renda) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
                [cpf, nome, bairro, cidade, estado, telefone, celular, renda], 
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results.insertId);
                }
            );
        });
    } catch (error) {
        throw new Error('Erro ao criar cliente: ' + error.message);
    }
};

module.exports.inserirMontadora = async (cnpj, razaoSocial, marca, contato, telefoneComercial, celular) => {
    try {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Montadora (cnpj, razao_social, marca, contato, telefone_comercial, celular) VALUES (?, ?, ?, ?, ?, ?)',
                [cnpj, razaoSocial, marca, contato, telefoneComercial, celular],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results.insertId);
                }
            );
        });
    } catch (error) {
        throw new Error('Erro ao cadastrar montadora: ' + error.message);
    }
};