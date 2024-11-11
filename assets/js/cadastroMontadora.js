document.addEventListener('DOMContentLoaded', () => {
    let cnpj = document.querySelector('#cnpj');
    let labelCnpj = document.querySelector('#labelCnpj');
    let validCnpj = false;

    let razaoSocial = document.querySelector('#razaoSocial');
    let labelRazaoSocial = document.querySelector('#labelRazaoSocial');
    let validRazaoSocial = false;

    let marca = document.querySelector('#marca');
    let labelMarca = document.querySelector('#labelMarca');
    let validMarca = false;

    let contato = document.querySelector('#contato');
    let labelContato = document.querySelector('#labelContato');
    let validContato = false;

    let telefoneComercial = document.querySelector('#telefoneComercial');
    let labelTelefoneComercial = document.querySelector('#labelTelefoneComercial');
    let validTelefoneComercial = false;

    let celular = document.querySelector('#celular');
    let labelCelular = document.querySelector('#labelCelular');
    let validCelular = false;

    let msgError = document.querySelector('#msgError');
    let msgSuccess = document.querySelector('#msgSuccess');

    // Validação do campo CNPJ
    cnpj.addEventListener('keyup', () => {
        validCnpj = cnpj.value.length >= 14; // Validar CNPJ com 14 caracteres
        labelCnpj.style.color = validCnpj ? 'green' : 'red';
        labelCnpj.textContent = validCnpj ? 'CNPJ' : 'CNPJ *Insira um CNPJ válido';
        cnpj.style.borderColor = validCnpj ? 'green' : 'red';
    });

    // Validação da razão social
    razaoSocial.addEventListener('keyup', () => {
        validRazaoSocial = razaoSocial.value.length >= 3;
        labelRazaoSocial.style.color = validRazaoSocial ? 'green' : 'red';
        labelRazaoSocial.textContent = validRazaoSocial ? 'Razão Social' : 'Razão Social *Insira no mínimo 3 caracteres';
        razaoSocial.style.borderColor = validRazaoSocial ? 'green' : 'red';
    });

    // Validação da marca
    marca.addEventListener('keyup', () => {
        validMarca = marca.value.length >= 2;
        labelMarca.style.color = validMarca ? 'green' : 'red';
        labelMarca.textContent = validMarca ? 'Marca' : 'Marca *Insira no mínimo 2 caracteres';
        marca.style.borderColor = validMarca ? 'green' : 'red';
    });

    // Validação do contato
    contato.addEventListener('keyup', () => {
        validContato = contato.value.length >= 3;
        labelContato.style.color = validContato ? 'green' : 'red';
        labelContato.textContent = validContato ? 'Contato' : 'Contato *Insira no mínimo 3 caracteres';
        contato.style.borderColor = validContato ? 'green' : 'red';
    });

    // Validação do telefone comercial
    telefoneComercial.addEventListener('keyup', () => {
        validTelefoneComercial = telefoneComercial.value.length >= 10;
        labelTelefoneComercial.style.color = validTelefoneComercial ? 'green' : 'red';
        labelTelefoneComercial.textContent = validTelefoneComercial ? 'Telefone Comercial' : 'Telefone Comercial *Insira um número válido';
        telefoneComercial.style.borderColor = validTelefoneComercial ? 'green' : 'red';
    });

    // Validação do celular
    celular.addEventListener('keyup', () => {
        validCelular = celular.value.length >= 10;
        labelCelular.style.color = validCelular ? 'green' : 'red';
        labelCelular.textContent = validCelular ? 'Celular' : 'Celular *Insira um número válido';
        celular.style.borderColor = validCelular ? 'green' : 'red';
    });

    // Envio do formulário
    document.querySelector('#formCadastro').addEventListener('submit', (e) => {
        e.preventDefault();

        if (validCnpj && validRazaoSocial && validMarca && validContato && validTelefoneComercial && validCelular) {
            let montadoraData = {
                cnpj: cnpj.value,
                razaoSocial: razaoSocial.value,
                marca: marca.value,
                contato: contato.value,
                telefoneComercial: telefoneComercial.value,
                celular: celular.value
            };

            fetch('http://localhost:3000/api/Montadora', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(montadoraData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    msgError.style.display = 'block';
                    msgError.innerHTML = `<strong>${data.error}</strong>`;
                    msgSuccess.style.display = 'none';
                } else {
                    msgSuccess.style.display = 'block';
                    msgSuccess.innerHTML = '<strong>Montadora cadastrada com sucesso!</strong>';
                    msgError.style.display = 'none';

                    setTimeout(() => {
                        window.location.href = '../html/LOGIN.html';
                    }, 3000);
                }
            })
            .catch(error => {
                console.error('Erro ao fazer a requisição:', error);
                msgError.style.display = 'block';
                msgError.innerHTML = '<strong>Erro ao cadastrar montadora. Tente novamente.</strong>';
            });
        } else {
            msgError.style.display = 'block';
            msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
            msgSuccess.style.display = 'none';
        }
    });
});
