const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
//Logar no sistema

checkLogged();

document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Conta não encontrada. Verifique o usuário e a senha.");
        return;
    }

    else {
        if(account.password != password)
        {
            alert("Conta não encontrada. Verifique o usuário e a senha.");
            return;
        }

        saveSession(email, checkSession);
        window.location.href = "home.html"
    }
    

});

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}
// Criar conta
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    console.log("Formulário enviado!");

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 6) {
        alert("Preencha o campo com um e-mail válido.");
        return;
    }
    if(password.length < 4) {
        alert("Preencha a senha com, no mínimo, 4 digítos.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    })
    myModal.hide();
    
    alert("Conta criada com sucesso!");
    window.location.href = "home.html";
    
});


function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
    console.log(data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}