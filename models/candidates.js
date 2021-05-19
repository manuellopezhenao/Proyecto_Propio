const Candidate = require("./candidate");
const mysqlConnection = require('../models/database');

class Candidates {
    constructor() {
        this.candidates = [];
    }

    // addCandidate(candidate = new Candidate()) {
    //     this.candidates.push(candidate);
    // }

    getCandidate() {
        mysqlConnection.query('SELECT * FROM `Candidates`', (err, rows, fields) => {
            this.candidates = [];
            for (let index = 0; index < rows.length; index++) {
                this.candidates.push(new Candidate(rows[index].ID, rows[index].name, rows[index].postulation, rows[index].votes));
            }
        });
        return this.candidates;
    }



    // addBand(band = new Band()) {
    //     this.bands.push(band);
    // }

    // getBands() {
    //     return this.bands;
    // }

    // deleteBands(id = '') {
    //     this.bands = this.bands.filter(band => band.id !== id);
    //     return this.bands;
    // }

    // vouteBands(id = '') {
    //     this.bands = this.bands.map(
    //         band => {
    //             if (band.id === id) {
    //                 band.votes++;
    //                 return band;
    //             } else {
    //                 return band;
    //             }
    //         }
    //     );
    // }
}




module.exports = Candidates;