document.addEventListener('DOMContentLoaded', () => {
    let chassi = document.querySelector('#chassi');
    let placa = document.querySelector('#placa');
    let marca = document.querySelector('#marca');
    let modelo = document.querySelector('#modelo');
    let anoFabricacao = document.querySelector('#anoFabricacao');
    let anoModelo = document.querySelector('#anoModelo');
    let cor = document.querySelector('#cor');
    let valor = document.querySelector('#valor');

    let msgError = document.querySelector('#msgError');
    let msgSuccess = document.querySelector('#msgSuccess');

    // Validação dos campos (se necessário)
    // (Você pode adicionar validações semelhantes às anteriores ou outras específicas)

    // Envio do formulário
    document.querySelector('#formCadastro').addEventListener('submit', (e) => {
        e.preventDefault();

        let veiculoData = {
            chassi: chassi.value,
            placa: placa.value,
            marca: marca.value,
            modelo: modelo.value,
            anoFabricacao: anoFabricacao.value,
            anoModelo: anoModelo.value,
            cor: cor.value,
            valor: valor.value
        };

        fetch('http://localhost:3000/api/Veiculo', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(veiculoData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                msgError.style.display = 'block';
                msgError.innerHTML = `<strong>${data.error}</strong>`;
                msgSuccess.style.display = 'none';
            } else {
                msgSuccess.style.display = 'block';
                msgSuccess.innerHTML = '<strong>Veículo cadastrado com sucesso!</strong>';
                msgError.style.display = 'none';

                setTimeout(() => {
                    window.location.href = '../html/VEICULOS.html';  // Ajuste a redireção
                }, 3000);
            }
        })
        .catch(error => {
            console.error('Erro ao fazer a requisição:', error);
            msgError.style.display = 'block';
            msgError.innerHTML = '<strong>Erro ao cadastrar veículo. Tente novamente.</strong>';
        });
    });
});
