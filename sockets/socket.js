const { io } = require("../index");
const Candidate = require("../models/candidate");
const Candidates = require("../models/candidates");


const candidates = new Candidates();
// candidates.addBand(new Candidate('Queen', 20));

// candidates.addCandidate(new Candidate("Manuel", 19));
// candidates.addCandidate(new Candidate("Luis", 49));
// candidates.addCandidate(new Candidate("Pedro", 29));
// candidates.addCandidate(new Candidate("Miguel", 15));


// console.log(candidates);

//Mensajes de Sockets
io.on("connection", (client) => {
    console.log("Cliente Conectado");
    client.emit('candidates', candidates.getCandidate());
    client.on("disconnect", () => {
        console.log("Cliente Desconectado");
    });

    client.on("voute-ban", (payload) => {
        bands.vouteBands(payload.id);
        io.emit('candidates', bands.getCandidate());
    });

    client.on("add-ban", (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('candidates', bands.getCandidate());
    });

    client.on("delete-ban", (payload) => {
        bands.deleteBands(payload.id);
        io.emit('candidates', bands.getCandidate());
    });
});