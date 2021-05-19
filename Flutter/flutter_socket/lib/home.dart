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
  List<Candidate> candidates = [];

  @override
  void initState() {
    final socketservice = Provider.of<SocketService>(context, listen: false);

    socketservice.socket.on('candidates', (payload) {
      setState(() {});

      this.candidates = (payload as List)
          .map((candidate) => Candidate.fromMap(candidate))
          .toList();
      print("Holar");
      setState(() {});
    });
    super.initState();
  }

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
          return _listCandidate(candidates[index]);
        },
      ),
    );
  }

  ListTile _listCandidate(Candidate candidate) {
    final socketservice = Provider.of<SocketService>(context, listen: false);

    // if (candidate.candidate == nameCandidate) {
    return ListTile(
      onTap: () {
        print(candidate.id);
        socketservice.socket.emit("voute-candidate", {
          'id': candidate.id,
        });
      },
      title: Text(
        candidate.name,
        style: TextStyle(fontSize: 17),
      ),
      leading: CircleAvatar(
        backgroundColor: (candidate.postulation == "Personeria")
            ? Colors.blueAccent
            : (candidate.postulation == "Contraloria")
                ? Colors.red[200]
                : (candidate.postulation == "Consejo")
                    ? Colors.greenAccent[100]
                    : Colors.white,
        child: (candidate.postulation == "Personeria")
            ? Icon(Icons.person)
            : (candidate.postulation == "Contraloria")
                ? Icon(Icons.calculate_outlined)
                : (candidate.postulation == "Consejo")
                    ? Icon(Icons.people_outline)
                    : Icon(Icons.error),
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
