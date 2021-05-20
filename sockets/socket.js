const { io } = require("../index");
const Candidate = require("../models/candidate");
const Candidates = require("../models/candidates");


const candidates = new Candidates();


//Mensajes de Sockets
io.on("connection", (client) => {
    console.log("Cliente Conectado");
    client.emit('candidates', candidates.getCandidate());
    client.on("disconnect", () => {
        console.log("Cliente Desconectado");
    });

    client.on("voute-candidate", (payload) => {
        candidates.vouteCandidate(payload.id);
    });

    client.on("add-candidate", (payload) => {
        const newCandidate = new Candidate(payload.name, payload.postulation);
        candidates.addCandidate(newCandidate);

    });

    client.on("delete-candidate", (payload) => {
        candidates.deleteCandidate(payload.id);
    });
});