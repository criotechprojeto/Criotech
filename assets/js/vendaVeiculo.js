document.getElementById('formVenda').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita o envio padrão do formulário

    // Obtém os dados do formulário
    const clienteCpf = document.getElementById('clienteCpf').value;
    const vendedorCodigo = document.getElementById('vendedorCodigo').value;
    const veiculoChassi = document.getElementById('veiculoChassi').value;
    const valorEntrada = document.getElementById('valorEntrada').value;
    const valorFinanciado = document.getElementById('valorFinanciado').value;
    const valorTotal = document.getElementById('valorTotal').value;

    const dadosVenda = {
        clienteCpf,
        vendedorCodigo,
        veiculoChassi,
        valorEntrada,
        valorFinanciado,
        valorTotal
    };

    // Envia os dados para o backend
    fetch('http://localhost:3000/api/Venda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosVenda)
    })
    .then(response => {
        console.log('Status da resposta do servidor:', response.status);
        // Verifica se a resposta foi ok
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor: ' + response.status);
        }
        // Tenta pegar o texto da resposta antes de parseá-lo
        return response.text().then(text => {
            console.log('Resposta do servidor:', text);  // Verifica o conteúdo da resposta

            // Caso a resposta seja válida, tenta convertê-la em JSON
            let data;
            try {
                data = JSON.parse(text);
                console.log('Resposta JSON:', data);  // Verifica se o JSON é válido
            } catch (e) {
                throw new Error('Erro ao parsear a resposta JSON: ' + e.message);
            }

            // Verifica a resposta do backend
            if (data.error) {
                document.getElementById('msgError').style.display = 'block';
                document.getElementById('msgError').textContent = 'Erro ao registrar a venda: ' + data.error;
                document.getElementById('msgSuccess').style.display = 'none';
            } else {
                document.getElementById('msgSuccess').style.display = 'block';
                document.getElementById('msgSuccess').textContent = 'Venda registrada com sucesso!';
                document.getElementById('msgError').style.display = 'none';
            }
        });
    })
    .catch(error => {
        document.getElementById('msgError').style.display = 'block';
        document.getElementById('msgError').textContent = 'Erro ao enviar a requisição: ' + error.message;
        document.getElementById('msgSuccess').style.display = 'none';
    });
});
