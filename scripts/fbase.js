const firebase = require("firebase")
const os = require('os');
const moment = require('moment')
// Initialize Firebase
var config = {
    apiKey: "AIzaSyChHe6-FXscOhS-kEKPwbw6wsNdgGkSDcY",
    authDomain: "map-of-scince.firebaseapp.com",
    databaseURL: "https://map-of-scince.firebaseio.com",
    storageBucket: "map-of-scince.appspot.com",
    messagingSenderId: "414788332482"
};
firebase.initializeApp(config)

exports.newData = (data) => {
    let time = new Date().getTime()
    let id = data.name + ":" + time
    let cpu = os.cpus()
    let info =
    {
        id: id,
        name: data.name,
        nodesCount: data.graph.length,
        edgesCount: data.edgeCount,
        time: time,
        pusher: {
            os: os.platform() + ":" + os.release(),
            mem: os.totalmem(),
            cpu: cpu[0].model + " " + cpu.length + "x" + cpu[0].speed+"MHz"
        }
    }

    firebase.database().ref("infographs/"+id).set(info)
    firebase.database().ref("graphList/"+id).set(data.graph)
}