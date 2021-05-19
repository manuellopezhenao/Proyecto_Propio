const Candidate = require("./candidate");
const { v4: uuid_v4 } = require('uuid');

const mysqlConnection = require('../models/database');

class Candidates {
    constructor() {
        this.candidates = [];
    }

    getCandidate() {
        mysqlConnection.query('SELECT * FROM `Candidates`', (err, rows, fields) => {
            this.candidates = [];
            for (let index = 0; index < rows.length; index++) {
                this.candidates.push({ "id": rows[index].ID, "name": rows[index].name, "postulation": rows[index].postulation, "votes": rows[index].votes });
            }
        });
        return this.candidates;
    }



    addCandidate(candidate = new Candidate()) {
        mysqlConnection.query(`INSERT INTO candidates (name, postulation, votes) VALUES ("${candidate.name}", "${candidate.postulation}", "${candidate.votes}")`, (err, rows, fields) => {
            if (err) {
                console.log(err);
            }
        });
    }


    deleteCandidate(id = '') {
        mysqlConnection.query(`DELETE FROM Candidates WHERE Candidates.ID = ${id}`, (err, rows, fields) => {
            if (err) {
                console.log(err);
            }
        });
    }

    vouteCandidate(id = '') {
        mysqlConnection.query(`UPDATE Candidates SET votes=votes+1  WHERE ID = ${id}`, (err, rows, fields) => {
            if (err) {
                console.log(err);
            }
        });
    }
}




module.exports = Candidates;