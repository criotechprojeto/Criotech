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

module.exports.buscarUsuarios = () => {
    return new Promise((resolve, reject) => {
      
        const query = 'SELECT * FROM usuarios';

       
        db.query(query, (error, results) => {
            if (error) {
                
                reject(error);
            } else {
                
                resolve(results);
            }
        });
    });
};