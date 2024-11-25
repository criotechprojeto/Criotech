document.addEventListener('DOMContentLoaded', () => {
    const corpoTabelaMontadoras = document.querySelector('#corpoTabelaMontadoras');
    
    // Função para exibir as montadoras na tabela
    async function listarMontadoras() {
        try {
            const response = await fetch('http://localhost:3000/api/Montadoras');
            const data = await response.json();

            if (data.error) {
                alert('Erro ao carregar montadoras parceiras: ' + data.error);
                return;
            }

            // Limpa a tabela antes de adicionar as novas montadoras
            corpoTabelaMontadoras.innerHTML = '';

            // Adiciona as montadoras parceiras na tabela
            data.result.forEach(montadora => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${montadora.cnpj}</td>
                    <td>${montadora.razao_social}</td>
                    <td>${montadora.marca}</td>
                    <td>${montadora.contato}</td>
                    <td>${montadora.telefone_comercial}</td>
                    <td>${montadora.celular}</td>
                `;
                corpoTabelaMontadoras.appendChild(row);
            });
        } catch (error) {
            console.error('Erro ao listar montadoras parceiras:', error);
            alert('Erro ao listar montadoras parceiras: ' + error.message);
        }
    }

    // Chama a função para listar as montadoras ao carregar a página
    listarMontadoras();
});
