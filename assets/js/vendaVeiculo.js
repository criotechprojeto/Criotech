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
    fetch('/Venda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosVenda)
    })
    .then(response => response.json())
    .then(data => {
        // Verifica a resposta do backend
        if (data.success) {
            document.getElementById('msgSuccess').style.display = 'block';
            document.getElementById('msgSuccess').textContent = 'Venda registrada com sucesso!';
            document.getElementById('msgError').style.display = 'none';
        } else {
            document.getElementById('msgError').style.display = 'block';
            document.getElementById('msgError').textContent = 'Erro ao registrar a venda: ' + data.error;
            document.getElementById('msgSuccess').style.display = 'none';
        }
    })
    .catch(error => {
        document.getElementById('msgError').style.display = 'block';
        document.getElementById('msgError').textContent = 'Erro ao enviar a requisição: ' + error.message;
        document.getElementById('msgSuccess').style.display = 'none';
    });
});
