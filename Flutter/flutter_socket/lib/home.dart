import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_socket/Socket/socket_services_provider.dart';
import 'package:flutter_socket/models/candidate.dart';
import 'package:provider/provider.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

int indexbard = 0;

class _HomePageState extends State<HomePage> {
  String categoria = "Personeria";
  List<Candidate> candidates = [
    Candidate(id: "1", name: "Manuel", candidate: "Contraloria", votes: 2),
    Candidate(id: "2", name: "Miguel", candidate: "Contraloria", votes: 3),
    Candidate(id: "3", name: "Jaime", candidate: "Personeria", votes: 2),
    Candidate(id: "4", name: "Jorge", candidate: "Consejo", votes: 1),
  ];
  @override
  Widget build(BuildContext context) {
    final socketservice = Provider.of<SocketService>(context);
    print(socketservice.serverStatus);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.blue[200],
        actions: [
          Container(
              margin: EdgeInsets.all(8.0),
              child: (socketservice.serverStatus == ServerStatus.Online)
                  ? Icon(
                      Icons.check_circle,
                      color: Colors.green,
                    )
                  : Icon(
                      Icons.highlight_off_outlined,
                      color: Colors.red,
                    ))
        ],
        title: Text('Votación'),
      ),
      body: ListView.builder(
        itemCount: candidates.length,
        itemBuilder: (BuildContext context, int index) {
          return _listCandidate(candidates[index], "Consejo");
        },
      ),
    );
  }

  ListTile _listCandidate(Candidate candidate, String nameCandidate) {
    // print(nameCandidate);
    // if (candidate.candidate == nameCandidate) {
    return ListTile(
      title: Text(
        candidate.name,
        style: TextStyle(fontSize: 17),
      ),
      leading: CircleAvatar(
        backgroundColor: (candidate.candidate == "Personeria")
            ? Colors.blueAccent
            : (candidate.candidate == "Contraloria")
                ? Colors.red[200]
                : Colors.greenAccent[100],
        child: (candidate.candidate == "Personeria")
            ? Icon(Icons.person)
            : (candidate.candidate == "Contraloria")
                ? Icon(Icons.calculate_outlined)
                : Icon(Icons.people_outline),
      ),
      trailing: Text("${candidate.votes}"),
    );
    // }
  }
  // if (candidate.candidate == nameCandidate) {
  //   print("si es");
  // } else {
  //   print("si es");
  // }

}
