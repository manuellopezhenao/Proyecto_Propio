const socket = io("http://localhost:3000");

socket.on("connect", function() {
    console.log("Conectado al servidor");
});

socket.on("disconnet", function() {
    console.log("Deconectado Al Servidor");
});


let index = 0;
var myChart;

const AddCandidateButton = document.getElementById("add");
const ButtonLine = document.getElementById("lineas");
const AddCandidateInput = document.querySelector(".form-control");

const dropdownInput = document.getElementById("postulacion");
AddCandidateButton.addEventListener("click", addCadidate);


socket.on("candidates", function(payload) {
    let table = document.querySelector("table");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    let data = Object.keys(payload[0]);
    generateTableHead(table, data);
    generateTable(table, payload);
    let ctx = document.getElementById('myChart').getContext('2d');
    let datos = [];
    let valores = [];
    let colores = [];
    for (const iterator of payload) {
        datos.push(iterator.name);
        valores.push(iterator.votes);
        colores.push(getColoresPastel());
    }
    if (index == 0) {

        myChart = generarGrafica(ctx, "pie", datos, colores, valores);
    }
    if (index == 1) {

        console.log(datos);

        myChart.destroy();
        myChart = generarGrafica(ctx, "pie", datos, colores, valores);
    }

    index = 1;

    function getColoresPastel() {
        return "hsl(" + 360 * Math.random() + ',' +
            (25 + 70 * Math.random()) + '%,' +
            (85 + 10 * Math.random()) + '%)'
    }
});




function generarGrafica(ctx, estilo, datos, colores, valores) {
    return new Chart(ctx, {
        type: estilo,
        data: {
            labels: datos,
            datasets: [{
                label: "1",
                data: valores,
                backgroundColor: colores,

                borderWidth: 0.1
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Resultado De Votaciones'
                }
            }
        },
    });
}

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
    }
    index = 0;

}