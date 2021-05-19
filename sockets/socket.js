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

    client.on("voute-candidate", (payload) => {
        candidates.vouteCandidate(payload.id, payload.name, payload.postulation, payload.votes++);
        io.emit('candidates', candidates.getCandidate());
    });

    client.on("add-candidate", (payload) => {
        const newCandidate = new Candidate(payload.name, payload.postulation);
        console.log(newCandidate);
        candidates.addCandidate(newCandidate);
        io.emit('candidates', candidates.getCandidate());
    });

    client.on("delete-candidate", (payload) => {
        console.log(payload);
        candidates.deleteCandidate(payload.id);
        io.emit('candidates', candidates.getCandidate());
    });
});