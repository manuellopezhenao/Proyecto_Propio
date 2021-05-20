const socket = io("http://localhost:3000");

socket.on("connect", function() {
    console.log("Conectado al servidor");
});

socket.on("disconnet", function() {
    console.log("Deconectado Al Servidor");
});


socket.on("candidates", function(payload) {

    console.log(payload);

    let table = document.querySelector("table");

    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    let data = Object.keys(payload[0]);
    generateTableHead(table, data);
    generateTable(table, payload);

});

const AddCandidateButton = document.getElementById("add");
const AddCandidateButton2 = document.getElementById("add2");
const AddCandidateInput = document.querySelector(".form-control");
const candidateList = document.querySelector(".todo-list");
let idPrueba = 0;

const dropdownInput = document.getElementById("asdaf");
AddCandidateButton.addEventListener("click", addCadidate);
AddCandidateButton2.addEventListener("click", addCadidate2);

function addCadidate(event) {
    event.preventDefault();
    console.log("Buttun");
    if (AddCandidateInput.value == "") {
        alert("Complete el campo");
    } else {
        socket.emit("add-candidate", {
            name: AddCandidateInput.value,
            postulation: dropdownInput.value
        });
        AddCandidateInput.value = "";
    }
}



function deleteCandidate(idCandidate) {

    socket.emit("delete-candidate", {
        id: idCandidate
    });

}

function addCadidate2(params) {
    params.preventDefault();




}

function generateTableHead(table, data) {

    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
    let th = document.createElement("th");
    let text = document.createTextNode("Accion");
    th.appendChild(text);
    row.appendChild(th);
}

function generateTable(table, data) {
    let index = 0;
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
        let cell = row.insertCell();
        let button = document.createElement("button");
        button.addEventListener("click", function() {
            deleteCandidate(element.id);
        });
        idPrueba = element.id;
        button.id = index;
        button.className = 'btn btn-primary';
        button.innerHTML = '<i class="fas fa-trash"></i>';
        cell.appendChild(button);
        index++;
        // console.log(element.id);
    }
    index = 0;

    // let button2 = document.getElementById("2");
    //evento click
    // console.log(button2);

    // button.addEventListener("click", prueba); //evento click

}

// let table = document.querySelector("table");
// let data = Object.keys(mountains[0]);
// generateTableHead(table, data);