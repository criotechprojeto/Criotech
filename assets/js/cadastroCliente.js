document.addEventListener('DOMContentLoaded', () => {
    let cpf = document.querySelector('#cpf');
    let nome = document.querySelector('#nome');
    let bairro = document.querySelector('#bairro');
    let cidade = document.querySelector('#cidade');
    let estado = document.querySelector('#estado');
    let telefone = document.querySelector('#telefone');
    let celular = document.querySelector('#celular');
    let renda = document.querySelector('#renda');

    let msgError = document.querySelector('#msgError');
    let msgSuccess = document.querySelector('#msgSuccess');

    // Validação do formulário, se necessário (ajustar conforme as regras específicas)
    // Exemplo para o CPF, renda, etc.

    // Envio do formulário
    document.querySelector('#formCadastro').addEventListener('submit', (e) => {
        e.preventDefault();

        let clienteData = {
            cpf: cpf.value,
            nome: nome.value,
            bairro: bairro.value,
            cidade: cidade.value,
            estado: estado.value,
            telefone: telefone.value,
            celular: celular.value,
            renda: renda.value
        };

        fetch('http://localhost:3000/api/Cliente', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                msgError.style.display = 'block';
                msgError.innerHTML = `<strong>${data.error}</strong>`;
                msgSuccess.style.display = 'none';
            } else {
                msgSuccess.style.display = 'block';
                msgSuccess.innerHTML = '<strong>Cliente cadastrado com sucesso!</strong>';
                msgError.style.display = 'none';

                setTimeout(() => {
                    window.location.href = '../html/CLIENTES.html';  // Ajuste a redireção para a página de listagem de clientes, se necessário
                }, 3000);
            }
        })
        .catch(error => {
            console.error('Erro ao fazer a requisição:', error);
            msgError.style.display = 'block';
            msgError.innerHTML = '<strong>Erro ao cadastrar cliente. Tente novamente.</strong>';
        });
    });
});
