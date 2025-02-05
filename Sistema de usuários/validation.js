const form = document.getElementById('signupform');
const email = document.getElementById('email-input');
const senha = document.getElementById('senha-input');
const nome = document.getElementById('nome-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    let errors = [];
    if (nome) {
        // se tem um nome no formulário estamos no register
        errors = getSignupFormErrors(nome.value, email.value, senha.value);
    } else {
        // se não tem um nome no formulário, não estamos no register
        errors = getLoginFormErrors(email.value, senha.value);
    }   
    if (errors.length > 0) {
        // se houver algum erro
        e.preventDefault();
        error_message.innerText = errors.join(". ");
    }
});

function getSignupFormErrors(nomeValue, emailValue, senhaValue) {
    let errors = [];
    // Verifica se os campos estão vazios
    if (nomeValue === '' || nomeValue == null) {
        errors.push('O campo nome é obrigatório');
        // Se precisar marcar o campo com erro, obtenha o elemento correto:
        // document.getElementById('nome-input').parentElement.classList.add('incorreto');
    }
    if (emailValue === '' || emailValue == null) {
        errors.push('O campo email é obrigatório');
        // document.getElementById('email-input').parentElement.classList.add('incorreto');
    }
    if (senhaValue === '' || senhaValue == null) {
        errors.push('O campo senha é obrigatório');
        // document.getElementById('senha-input').parentElement.classList.add('incorreto');
    }
    return errors; 
}
