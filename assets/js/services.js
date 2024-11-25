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

module.exports.atualizarCliente = async (cpf, novoCpf, nome, bairro, cidade, estado, telefone, celular, renda) => {
    // Verifique se o CPF é válido
    if (!cpf) {
        throw new Error('CPF do cliente não fornecido ou inválido');
    }

    try {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Cliente SET cpf = ?, nome = ?, endereco_bairro = ?, endereco_cidade = ?, endereco_estado = ?, telefone_residencial = ?, celular = ?, renda = ? WHERE cpf = ?';
            db.query(query, [novoCpf, nome, bairro, cidade, estado, telefone, celular, renda, cpf], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results.affectedRows);  // Retorna o número de linhas afetadas
            });
        });
    } catch (error) {
        throw new Error('Erro ao atualizar cliente: ' + error.message);
    }
};

module.exports.buscarClientePorNomeOuCpf = async (nomeOuCpf) => {
    try {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM Cliente 
                WHERE cpf = ? OR nome LIKE ?`;

            db.query(query, [nomeOuCpf, `%${nomeOuCpf}%`], (error, results) => {
                if (error) {
                    reject(new Error('Erro ao buscar cliente: ' + error.message));
                    return;
                }

                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            });
        });
    } catch (error) {
        throw new Error('Erro ao buscar cliente: ' + error.message);
    }
};

module.exports.listarVeiculosDisponiveis = async () => {
    try {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT numero_chassi, placa, marca, modelo, ano_fabricacao, ano_modelo, cor, valor
                FROM Veiculo
                WHERE disponivel = 1`;  // Supondo que a coluna "disponivel" indica se o veículo está à venda

            db.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Erro ao listar veículos: ' + error.message));
                    return;
                }

                resolve(results);  // Retorna os resultados da consulta
            });
        });
    } catch (error) {
        throw new Error('Erro ao listar veículos: ' + error.message);
    }
};

module.exports.listarMontadoras = async () => {
    try {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT cnpj, razao_social, marca, contato, telefone_comercial, celular
                FROM Montadora
            `;

            /*console.log('Executando consulta SQL:', query);*/

            db.query(query, (error, results) => {
                if (error) {
                    reject(new Error('Erro ao listar montadoras: ' + error.message));
                    return;
                }

                resolve(results);
            });
        });
    } catch (error) {
        throw new Error('Erro ao listar montadoras: ' + error.message);
    }
};

module.exports.buscarVeiculoPorChassi = async (chassi) => {
    try {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Veiculos WHERE numero_chassi = ?';
            db.query(query, [chassi], (error, results) => {
                if (error) {
                    reject(new Error('Erro ao buscar veículo: ' + error.message));
                    return;
                }

                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            });
        });
    } catch (error) {
        throw new Error('Erro ao buscar veículo: ' + error.message);
    }
};

module.exports.buscarVendedorPorCodigo = async (codigo) => {
    try {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Vendedores WHERE codigo = ?';
            db.query(query, [codigo], (error, results) => {
                if (error) {
                    reject(new Error('Erro ao buscar vendedor: ' + error.message));
                    return;
                }

                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            });
        });
    } catch (error) {
        throw new Error('Erro ao buscar vendedor: ' + error.message);
    }
};

module.exports.inserirVenda = async (data, clienteCpf, vendedorCodigo, veiculoChassi, valorEntrada, valorFinanciado, valorTotal) => {
    try {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO Vendas (data, cliente_cpf, vendedor_codigo, veiculo_chassi, valor_entrada, valor_financiado, valor_total) ' +
                'VALUES (?, ?, ?, ?, ?, ?, ?)',
                [data, clienteCpf, vendedorCodigo, veiculoChassi, valorEntrada, valorFinanciado, valorTotal],
                (error, results) => {
                    if (error) {
                        reject(new Error('Erro ao registrar venda: ' + error.message));
                        return;
                    }
                    resolve(results.insertId);
                }
            );
        });
    } catch (error) {
        throw new Error('Erro ao registrar venda: ' + error.message);
    }
};
