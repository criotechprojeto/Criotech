document.addEventListener('DOMContentLoaded', () => {
    const corpoTabelaVeiculos = document.querySelector('#corpoTabelaVeiculos');
    
    // Função para exibir os veículos na tabela
    async function listarVeiculos() {
        try {
            const response = await fetch('http://localhost:3000/api/Veiculos');
            const data = await response.json();

            if (data.error) {
                alert('Erro ao carregar veículos: ' + data.error);
                return;
            }

            // Limpa a tabela antes de adicionar os novos veículos
            corpoTabelaVeiculos.innerHTML = '';

            // Adiciona os veículos na tabela
            data.result.forEach(veiculo => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${veiculo.numero_chassi}</td>
                    <td>${veiculo.placa}</td>
                    <td>${veiculo.marca}</td>
                    <td>${veiculo.modelo}</td>
                    <td>${veiculo.ano_fabricacao}</td>
                    <td>${veiculo.ano_modelo}</td>
                    <td>${veiculo.cor}</td>
                    <td>${veiculo.valor}</td>
                `;
                corpoTabelaVeiculos.appendChild(row);
            });
        } catch (error) {
            console.error('Erro ao listar veículos:', error);
            alert('Erro ao listar veículos: ' + error.message);
        }
    }

    // Chama a função para listar os veículos ao carregar a página
    listarVeiculos();
});
