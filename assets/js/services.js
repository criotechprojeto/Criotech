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