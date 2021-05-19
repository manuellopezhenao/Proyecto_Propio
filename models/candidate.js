const { v4: uuid_v4 } = require('uuid');



class Candidate {
    constructor(id, name = "no-name", postulacion, votes) {
        this.id = id; //Identificador unico
        this.name = name;
        this.postulacion = postulacion;
        this.votes = votes;
    }
}

module.exports = Candidate;