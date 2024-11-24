document.addEventListener('DOMContentLoaded', () => {
    const nome = document.querySelector('#nome');
    const cpf = document.querySelector('#cpf');
    const bairro = document.querySelector('#bairro');
    const cidade = document.querySelector('#cidade');
    const estado = document.querySelector('#estado');
    const telefone = document.querySelector('#telefone');
    const celular = document.querySelector('#celular');
    const renda = document.querySelector('#renda');
    const senha = document.querySelector('#senha');
    const msgError = document.querySelector('#msgError');
    const msgSuccess = document.querySelector('#msgSuccess');

    const btnBuscarCliente = document.querySelector('#btnBuscarCliente');
    const btnFecharPopup = document.querySelector('#btnFecharPopup');
    const popupBusca = document.querySelector('#popupBusca');
    const btnBuscar = document.querySelector('#btnBuscar');
    const formAtualizarCliente = document.querySelector('#formAtualizarCliente');

    let clienteId = null;

    // Função para exibir o erro completo
    function exibirErroCompleto(errorMessage) {
        msgError.style.display = 'block';
        msgError.innerHTML = `<strong>Erro: </strong>${errorMessage}`;
    }

    // Função para buscar cliente pelo nome ou CPF
    async function buscarCliente(nomeOuCpf) {
        try {
            const response = await fetch(`http://localhost:3000/api/Cliente/buscar/${nomeOuCpf}`);
            const data = await response.json();
            
            if (data.error) {
                // Exibe erro completo se a API retornar erro
                exibirErroCompleto(data.error);
                return;
            }
            
            const cliente = data.result;
            clienteId = cliente.codigo;

            // Preenche o formulário com os dados do cliente
            nome.value = cliente.nome;
            cpf.value = cliente.cpf;
            bairro.value = cliente.endereco_bairro;
            cidade.value = cliente.endereco_cidade;
            estado.value = cliente.endereco_estado;
            telefone.value = cliente.telefone_residencial;
            celular.value = cliente.celular;
            renda.value = cliente.renda;

            // Exibe o formulário para alteração
            formAtualizarCliente.style.display = 'block';
            popupBusca.style.display = 'none';

        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            exibirErroCompleto('Erro ao buscar cliente: ' + error.message);
        }
    }

    // Evento do botão para abrir o popup de busca
    btnBuscarCliente.addEventListener('click', () => {
        popupBusca.style.display = 'block';
    });

    // Evento do botão para fechar o popup
    btnFecharPopup.addEventListener('click', () => {
        popupBusca.style.display = 'none';
    });

    // Evento de busca de cliente
    btnBuscar.addEventListener('click', () => {
        const nomeOuCpf = document.querySelector('#campoBusca').value;
        if (nomeOuCpf) {
            buscarCliente(nomeOuCpf);
        } else {
            exibirErroCompleto('Informe um nome ou CPF para buscar.');
        }
    });

    // Função para enviar a atualização do cliente
    formAtualizarCliente.addEventListener('submit', async (e) => {
        e.preventDefault();

        const clienteData = {
            nome: nome.value,
            cpf: cpf.value,
            bairro: bairro.value,
            cidade: cidade.value,
            estado: estado.value,
            telefone: telefone.value,
            celular: celular.value,
            renda: renda.value,
            senha: senha.value,
        };

        // Enviar os dados de alteração para o servidor
        try {
            const response = await fetch(`http://localhost:3000/api/Cliente/${clienteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clienteData)
            });

            const data = await response.json();

            if (data.error) {
                // Exibe erro completo se a API retornar erro
                exibirErroCompleto(data.error);
            } else {
                msgSuccess.style.display = 'block';
                msgSuccess.innerHTML = '<strong>Dados do cliente atualizados com sucesso!</strong>';
                msgError.style.display = 'none';
            }
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            exibirErroCompleto('Erro ao atualizar cliente: ' + error.message);
        }
    });
});
