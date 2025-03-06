const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let cashIn = [];
let cashOut = [];
let data = {
    transactions: []
};


checkLogged();

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged) {
        window.location.href = "index.html";
    }

    const dataUser = localStorage.getItem(logged);

    if(dataUser) {
        data = JSON.parse(dataUser)
    }

    getTransactions();

};

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
};

document.getElementById("button-logout").addEventListener("click", function() {
    logout();
});

document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("data-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, data: date
    });
    
    saveDate(data);
    e.target.reset();
    myModal.hide();

    alert("Lançamento adicionado com sucesso!");
    getTransactions();
});

function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    transactions.forEach(item => {
        let type = "Entrada";
        if(item.type === "2") {
            type = "Saída"
        }

        transactionsHtml += `
            <tr>
                <th scope="row">${item.data}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
            </tr>
        `
    });

    document.getElementById("transactions-list").innerHTML = transactionsHtml;
};

function saveDate(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
};