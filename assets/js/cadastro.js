document.addEventListener('DOMContentLoaded', () => {
    let usuario = document.querySelector('#usuario');
    let labelUsuario = document.querySelector('#labelUsuario');
    let validUsuario = false;

    let senha = document.querySelector('#senha');
    let labelSenha = document.querySelector('#labelSenha');
    let validSenha = false;

    let msgError = document.querySelector('#msgError');
    let msgSuccess = document.querySelector('#msgSuccess');

    let btn = document.querySelector('#verSenha');

    // Validação do campo de usuário
    usuario.addEventListener('keyup', () => {
        validUsuario = usuario.value.length >= 3; // Ajuste de acordo com a lógica que você deseja
        labelUsuario.style.color = validUsuario ? 'green' : 'red';
        labelUsuario.textContent = validUsuario ? 'Usuário' : 'Usuário *Insira no mínimo 3 caracteres';
        usuario.style.borderColor = validUsuario ? 'green' : 'red';
    });

    // Validação do campo de senha
    senha.addEventListener('keyup', () => {
        validSenha = senha.value.length >= 6;
        labelSenha.style.color = validSenha ? 'green' : 'red';
        labelSenha.textContent = validSenha ? 'Senha' : 'Senha *Insira no mínimo 6 caracteres';
        senha.style.borderColor = validSenha ? 'green' : 'red';
    });

    // Envio do formulário
    document.querySelector('#formCadastro').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(`validUsuario: ${validUsuario}, validSenha: ${validSenha}`);

        if (validUsuario && validSenha) {
            let userData = {
                usuario: usuario.value,
                senha: senha.value
            };

            fetch('http://localhost:3000/api/Vendedor', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    msgError.style.display = 'block';
                    msgError.innerHTML = `<strong>${data.error}</strong>`;
                    msgSuccess.style.display = 'none';
                } else {
                    msgSuccess.style.display = 'block';
                    msgSuccess.innerHTML = '<strong>Usuário cadastrado com sucesso!</strong>';
                    msgError.style.display = 'none';

                    setTimeout(() => {
                        window.location.href = '../html/LOGIN.html';
                    }, 3000);
                }
            })
            .catch(error => {
                console.error('Erro ao fazer a requisição:', error);
                msgError.style.display = 'block';
                msgError.innerHTML = '<strong>Erro ao cadastrar usuário. Tente novamente.</strong>';
            });
        } else {
            msgError.style.display = 'block';
            msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
            msgSuccess.style.display = 'none';
        }
    });

    // Mostrar/Ocultar senha
    btn.addEventListener('click', () => {
        senha.type = senha.type === 'password' ? 'text' : 'password';
    });

});