const firebase = require("firebase")
const R = require("./libs/ramda.min")
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


let keys = {}
module.exports = {
    getKeys:()=>keys,
    init(done) {
        let ref = firebase.database().ref("infoWiki");
        ref.once('value')
           .then(
               (dataSnapshot) => {
                   let v = R.values(dataSnapshot.val())
                   if (v.length>0) {
                       let ids = R.indexBy(R.prop("id"), v)
                       keys = ids
                   }
                   console.log("length ", v.length)
                   done(keys)
               }
           );
    },

    newData: (data) => {
        let time = new Date().getTime()
        let id = data.name + "_" + time
        let cpu = os.cpus()
        let info =
        {
            id: id,
            name: data.name,
            nodesCount: data.graph.length,
            edgesCount: data.edgeCount,
            time: time,
            pusher: {
                os: os.platform() + "_" + os.release(),
                mem: os.totalmem(),
                cpu: cpu[0].model + " " + cpu.length + "x" + cpu[0].speed + "MHz"
            }
        }

        firebase.database().ref("infoGraphs/" + id).set(info)
        firebase.database().ref("graphList/" + id).set(data.graph)
        console.log("push", info.name)
        console.log("pusher", info.pusher)

    },
    writeInfo: (data) => {
        let uid = "n" + R.values(keys).length
        data.uid = uid
        firebase.database().ref("infoWiki/" + uid).set(data)
        keys[data.id] = data
        return uid
    },
}


