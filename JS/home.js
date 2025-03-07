const myModal = new bootstrap.Modal("#transaction-modal");
const mySecondModal = new bootstrap.Modal("#transaction-remove-modal");

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

    getCashIn();
    getCashOut();
    getTotal();
};

document.getElementById("button-logout").addEventListener("click", function() {
    logout();
});

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
};

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

    getCashIn();
    getCashOut();
    getTotal();
    alert("Lançamento adicionado com sucesso!");
});

document.getElementById("transaction-remove-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const transactions = data.transactions;
    const value = parseFloat(document.getElementById("value-remove-input").value);
    const description = document.getElementById("description-remove-input").value;
    const date = document.getElementById("data-remove-input").value;
    const type = document.querySelector('input[name="type-remove-input"]:checked').value;

    const found = transactions.findIndex(item => item.value.toFixed(2) == value.toFixed(2) && 
    item.description == description && item.data == date && item.type == type);

    console.log(found);
    if(found !== -1) {
        transactions.splice(found, 1);
        
        e.target.reset();
        mySecondModal.hide();

        getCashIn();
        getCashOut();
        getTotal();
        alert("Lançamento removido com sucesso!");
        saveDate(data)
    }

    else {
        alert("Lançamento não encontrado. Revise as informações.");
    }
    
});

function getCashIn() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "1");
    
    if(cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if(cashIn.length > 5) {
            limit = 5;
        }
        else {
            limit = cashIn.length;
        }
        for (let index = 0; index < limit; index++) {
            cashInHtml += `
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col md-8">
                                    <p>${cashIn[index].description}</p>
                                </div>
                                <div class="col-12 md-3 d-flex justify-content-end">
                                    ${cashIn[index].data}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
};

function getCashOut() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type === "2");
    
    if(cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if(cashIn.length > 5) {
            limit = 5;
        }
        else {
            limit = cashIn.length;
        }
        for (let index = 0; index < limit; index++) {
            cashInHtml += `
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col md-8">
                                    <p>${cashIn[index].description}</p>
                                </div>
                                <div class="col-12 md-3 d-flex justify-content-end">
                                    ${cashIn[index].data}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

        document.getElementById("cash-out-list").innerHTML = cashInHtml;
    } 
};

function getTotal() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach(item => {
        if(item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
};

document.getElementById("transactions-button").addEventListener("click", function(e) {
    e.preventDefault();

    window.location.href = "transactions.html"
});

function saveDate(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
};