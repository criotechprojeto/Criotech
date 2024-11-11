document.addEventListener('DOMContentLoaded', () => {
    let usuario = document.querySelector('#usuario');
    let labelUsuario = document.querySelector('#labelUsuario');
    let validUsuario = false;

    let senha = document.querySelector('#senha');
    let labelSenha = document.querySelector('#labelSenha');
    let validSenha = false;

    let msgError = document.querySelector('#msgError');
    let msgSuccess = document.querySelector('#msgSuccess');
    let btnLogin = document.querySelector('#btnLogin');
    let btnVerSenha = document.querySelector('#verSenha');

    // Validação do campo de usuário
    usuario.addEventListener('keyup', () => {
        validUsuario = usuario.value.length >= 3; // Ajuste de acordo com a lógica que você deseja
        labelUsuario.style.color = validUsuario ? 'green' : 'red';
        labelUsuario.textContent = validUsuario ? 'Usuário' : 'Usuário *Insira no mínimo 3 caracteres';
        usuario.style.borderColor = validUsuario ? 'green' : 'red';
    });

    // Validação do campo de senha
    senha.addEventListener('keyup', () => {
        validSenha = senha.value.length >= 6; // Mínimo de 6 caracteres
        labelSenha.style.color = validSenha ? 'green' : 'red';
        labelSenha.textContent = validSenha ? 'Senha' : 'Senha *Insira no mínimo 6 caracteres';
        senha.style.borderColor = validSenha ? 'green' : 'red';
    });

    // Envio do formulário de login
    document.querySelector('#formLogin').addEventListener('submit', (e) => {
        e.preventDefault();

        // Exibição de mensagens de erro ou sucesso
        msgError.style.display = 'none';  // Limpa as mensagens de erro anteriores
        msgSuccess.style.display = 'none'; // Limpa as mensagens de sucesso anteriores

        if (validUsuario && validSenha) {
            btnLogin.disabled = true;  // Desabilita o botão de login enquanto a requisição é feita
            btnLogin.textContent = 'Carregando...';  // Altera o texto do botão para 'Carregando...'

            let userData = {
                usuario: usuario.value,
                senha: senha.value
            };

            fetch('http://localhost:3000/api/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                btnLogin.disabled = false;  // Reabilita o botão
                btnLogin.textContent = 'Entrar';  // Restaura o texto do botão

                if (data.error) {
                    msgError.style.display = 'block';
                    msgError.innerHTML = `<strong>${data.error}</strong>`;
                    msgSuccess.style.display = 'none';
                } else {
                    msgSuccess.style.display = 'block';
                    msgSuccess.innerHTML = '<strong>Login realizado com sucesso!</strong>';
                    msgError.style.display = 'none';

                    setTimeout(() => {
                        // Após login bem-sucedido, redireciona para a página principal ou dashboard
                        window.location.href = '../html/MENU.html';
                    }, 3000);  // Redireciona após 3 segundos
                }
            })
            .catch(error => {
                btnLogin.disabled = false;  // Reabilita o botão
                btnLogin.textContent = 'Entrar';  // Restaura o texto do botão

                console.error('Erro ao fazer a requisição:', error);
                msgError.style.display = 'block';
                msgError.innerHTML = '<strong>Erro ao realizar login. Tente novamente.</strong>';
            });
        } else {
            msgError.style.display = 'block';
            msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de entrar</strong>';
            msgSuccess.style.display = 'none';
        }
    });

    // Mostrar/Ocultar senha
    btnVerSenha.addEventListener('click', () => {
        senha.type = senha.type === 'password' ? 'text' : 'password';
    });
});
