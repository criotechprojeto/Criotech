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
    const resultadosBusca = document.querySelector('#resultadosBusca');
    const listaResultados = document.querySelector('#listaResultados');
    const formAtualizarCliente = document.querySelector('#formAtualizarCliente');

    let clienteId = null;

    // Função para exibir mensagens de erro detalhadas
    function exibirErroCompleto(errorMessage) {
        msgError.style.display = 'block';
        msgError.innerHTML = `<strong>Erro:</strong> ${errorMessage}`;
        console.error(`Erro detalhado: ${errorMessage}`);
    }

    // Função para buscar clientes pelo nome ou CPF
    async function buscarClientes(nomeOuCpf) {
        try {
            const response = await fetch(`http://localhost:3000/api/Cliente/buscar/${nomeOuCpf}`);
            if (!response.ok) {
                throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(`API retornou erro: ${data.error}`);
            }

            const clientes = data.result;
            if (!Array.isArray(clientes) || clientes.length === 0) {
                throw new Error('Nenhum cliente encontrado com os critérios fornecidos.');
            }

            // Exibir lista de resultados
            listaResultados.innerHTML = '';
            clientes.forEach(cliente => {
                const item = document.createElement('li');
                item.textContent = `${cliente.nome} - CPF: ${cliente.cpf}`;
                item.dataset.id = cliente.codigo; // Usar código único
                item.addEventListener('click', () => selecionarCliente(cliente));
                listaResultados.appendChild(item);
            });
            resultadosBusca.style.display = 'block';
        } catch (error) {
            exibirErroCompleto(`Erro ao buscar clientes: ${error.message}`);
        }
    }

    // Função para preencher o formulário com os dados do cliente selecionado
    function selecionarCliente(cliente) {
        try {
            clienteId = cliente.codigo;
            nome.value = cliente.nome;
            cpf.value = cliente.cpf;
            bairro.value = cliente.endereco_bairro;
            cidade.value = cliente.endereco_cidade;
            estado.value = cliente.endereco_estado;
            telefone.value = cliente.telefone_residencial;
            celular.value = cliente.celular;
            renda.value = cliente.renda;

            formAtualizarCliente.style.display = 'block';
            popupBusca.style.display = 'none';
        } catch (error) {
            exibirErroCompleto(`Erro ao selecionar cliente: ${error.message}`);
        }
    }

    // Evento do botão para abrir o popup de busca
    btnBuscarCliente.addEventListener('click', () => {
        try {
            popupBusca.style.display = 'block';
        } catch (error) {
            exibirErroCompleto(`Erro ao abrir o popup de busca: ${error.message}`);
        }
    });

    // Evento do botão para fechar o popup
    btnFecharPopup.addEventListener('click', () => {
        try {
            popupBusca.style.display = 'none';
            resultadosBusca.style.display = 'none';
        } catch (error) {
            exibirErroCompleto(`Erro ao fechar o popup: ${error.message}`);
        }
    });

    // Evento de busca de clientes
    btnBuscar.addEventListener('click', () => {
        try {
            const nomeOuCpf = document.querySelector('#campoBusca').value.trim();
            if (nomeOuCpf) {
                buscarClientes(nomeOuCpf);
            } else {
                exibirErroCompleto('Informe um nome ou CPF para buscar.');
            }
        } catch (error) {
            exibirErroCompleto(`Erro no evento de busca: ${error.message}`);
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

        try {
            const response = await fetch(`http://localhost:3000/api/Cliente/buscar/' + nomeOuCpf`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clienteData),
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(`API retornou erro: ${data.error}`);
            }

            msgSuccess.style.display = 'block';
            msgSuccess.innerHTML = '<strong>Dados do cliente atualizados com sucesso!</strong>';
            msgError.style.display = 'none';
        } catch (error) {
            exibirErroCompleto(`Erro ao atualizar cliente: ${error.message}`);
        }
    });
});
