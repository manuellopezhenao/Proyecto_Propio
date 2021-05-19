class Candidate {
  int id;
  String name;
  String postulation;
  int votes;

  Candidate({this.id, this.name, this.postulation, this.votes});

  factory Candidate.fromMap(Map<String, dynamic> candidate) {
    return Candidate(
      id: candidate.containsKey('id') ? candidate['id'] : 'no-id',
      name: candidate.containsKey('name') ? candidate['name'] : 'no-name',
      postulation: candidate.containsKey('postulation')
          ? candidate['postulation']
          : 'no-candidate',
      votes: candidate.containsKey('votes') ? candidate['votes'] : 'no-vote',
    );
  }
}
