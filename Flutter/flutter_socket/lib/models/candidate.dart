class Candidate {
  String id;
  String name;
  String candidate;
  int votes;

  Candidate({this.id, this.name, this.candidate, this.votes});

  factory Candidate.fromMap(Map<String, dynamic> candidate) => Candidate(
      id: candidate['id'],
      name: candidate['name'],
      candidate: candidate['candidate'],
      votes: candidate['votes']);
}
