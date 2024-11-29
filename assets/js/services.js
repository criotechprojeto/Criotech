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
                    console.error('Erro no banco de dados:', error);
                    reject(new Error('Erro ao buscar cliente: ' + error.message));
                    return;
                }

                resolve(results); // Retorna todos os resultados
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
        //console.log('Buscando veículo com chassi:', chassi);  // Log para depuração

        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Veiculo WHERE numero_chassi = ?';
            db.query(query, [chassi], (error, results) => {
                if (error) {
                    console.error('Erro ao buscar veículo com chassi:', chassi, error);  // Log do erro com contexto
                    reject(new Error(`Erro ao buscar veículo com chassi ${chassi}: ${error.message}`));
                    return;
                }

                if (results.length > 0) {
                    //console.log('Veículo encontrado:', results[0]);  // Log de sucesso
                    resolve(results[0]);
                } else {
                    //console.log('Veículo com chassi não encontrado:', chassi);  // Log de não encontrado
                    resolve(null);  // Retorna null se não encontrar o veículo
                }
            });
        });
    } catch (error) {
        console.error('Erro ao tentar buscar veículo por chassi:', chassi, error);  // Log detalhado de erro
        throw new Error(`Erro ao buscar veículo com chassi ${chassi}: ${error.message}`);
    }
};


module.exports.buscarVendedorPorCodigo = async (codigo) => {
    try {
        //console.log('Buscando vendedor com código:', codigo);  // Log para depuração

        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Vendedor WHERE codigo = ?';
            db.query(query, [codigo], (error, results) => {
                if (error) {
                    console.error('Erro ao buscar vendedor com código:', codigo, error);  // Log do erro com contexto
                    reject(new Error(`Erro ao buscar vendedor com código ${codigo}: ${error.message}`));
                    return;
                }

                if (results.length > 0) {
                    //console.log('Vendedor encontrado:', results[0]);  // Log de sucesso
                    resolve(results[0]);
                } else {
                    //console.log('Vendedor com código não encontrado:', codigo);  // Log de não encontrado
                    resolve(null);  // Retorna null se não encontrar o vendedor
                }
            });
        });
    } catch (error) {
        console.error('Erro ao tentar buscar vendedor por código:', codigo, error);  // Log detalhado de erro
        throw new Error(`Erro ao buscar vendedor com código ${codigo}: ${error.message}`);
    }
};



module.exports.inserirVenda = async (data, clienteCpf, vendedorCodigo, veiculoChassi, valorEntrada, valorFinanciado, valorTotal) => {
    try {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO operacaovenda (data, cliente_cpf, vendedor_codigo, veiculo_chassi, valor_entrada, valor_financiado, valor_total) ' +
                'VALUES (?, ?, ?, ?, ?, ?, ?)',
                [data, clienteCpf, vendedorCodigo, veiculoChassi, valorEntrada, valorFinanciado, valorTotal],
                (error, results) => {
                    if (error) {
                        console.error('Erro ao tentar inserir venda no banco de dados:', error);  // Log do erro
                        reject(new Error(`Erro ao tentar registrar venda no banco de dados: ${error.message}. Detalhes da consulta: ${error.stack}`));
                        return;
                    }
                    //console.log('Venda registrada com sucesso, ID:', results.insertId);  // Log de sucesso
                    resolve(results.insertId);
                }
            );
        });
    } catch (error) {
        console.error('Erro inesperado ao tentar registrar venda:', error);  // Log detalhado do erro
        throw new Error(`Erro ao registrar venda: ${error.message}. Detalhes: ${error.stack}`);
    }
};

module.exports.inserirCompra = async (data, clienteCpf, vendedorCodigo, veiculoChassi, valor) => {
    try {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO operacaocompra (data, cliente_cpf, vendedor_codigo, veiculo_chassi, valor) ' +
                'VALUES (?, ?, ?, ?, ?)',
                [data, clienteCpf, vendedorCodigo, veiculoChassi, valor],
                (error, results) => {
                    if (error) {
                        console.error('Erro ao tentar inserir compra no banco de dados:', error);  // Log detalhado do erro
                        reject(new Error(`Erro ao tentar registrar compra no banco de dados: ${error.message}. Detalhes da consulta: ${error.stack}`));
                        return;
                    }
                    resolve(results.insertId); // Retorna o ID da compra registrada
                }
            );
        });
    } catch (error) {
        console.error('Erro inesperado ao tentar registrar compra:', error);  // Log detalhado do erro
        throw new Error(`Erro ao registrar compra: ${error.message}. Detalhes: ${error.stack}`);
    }
};