class Candidate {
    constructor(name = "no-name", postulation) {
        this.name = name;
        this.postulation = postulation;
        this.votes = 0;
    }
}

module.exports = Candidate;