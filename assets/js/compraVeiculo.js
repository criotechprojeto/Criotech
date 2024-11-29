document.getElementById('formCompra').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita o envio padrão do formulário

    // Obtém os dados do formulário
    const clienteCpf = document.getElementById('clienteCpf').value;
    const vendedorCodigo = document.getElementById('vendedorCodigo').value;
    const veiculoChassi = document.getElementById('veiculoChassi').value;
    const valor = document.getElementById('valor').value;

    const dadosCompra = {
        clienteCpf,
        vendedorCodigo,
        veiculoChassi,
        valor
    };

    // Validação dos campos obrigatórios
    if (!clienteCpf || !vendedorCodigo || !veiculoChassi || !valor) {
        document.getElementById('msgError').style.display = 'block';
        document.getElementById('msgErrorText').textContent = 'Todos os campos são obrigatórios!';
        document.getElementById('msgErrorDetails').textContent = 'Por favor, preencha todos os campos antes de enviar o formulário.';
        document.getElementById('msgSuccess').style.display = 'none';
        return;
    }

    // Envia os dados para o backend
    fetch('http://localhost:3000/api/Compra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosCompra)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor: ' + response.status);
        }
        return response.text().then(text => {
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                throw new Error('Erro ao parsear a resposta JSON: ' + e.message);
            }

            if (data.error) {
                document.getElementById('msgError').style.display = 'block';
                document.getElementById('msgErrorText').textContent = 'Erro ao registrar a compra: ' + data.error;
                document.getElementById('msgErrorDetails').textContent = 'Detalhes do erro: ' + data.error;
                document.getElementById('msgSuccess').style.display = 'none';
            } else {
                document.getElementById('msgSuccess').style.display = 'block';
                document.getElementById('msgSuccess').textContent = 'Compra registrada com sucesso!';
                document.getElementById('msgError').style.display = 'none';
            }
        });
    })
    .catch(error => {
        document.getElementById('msgError').style.display = 'block';
        document.getElementById('msgErrorText').textContent = 'Erro ao enviar a requisição: ' + error.message;
        document.getElementById('msgErrorDetails').textContent = 'Detalhes do erro: ' + error.stack;
        document.getElementById('msgSuccess').style.display = 'none';
    });
});
