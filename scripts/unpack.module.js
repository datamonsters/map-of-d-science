let fbase = require("./firebase.module")
const R = require('./libs/ramda.min.js')

const AdmZip = require('adm-zip')
let nodes = []
let a, d, i,
    desArr = []
const getInfo = (s) => {
    desArr = []
    i = 0
    while (true) {
        d = s[i++]
        if (d != "" && d.length > 30) {
            desArr.push(s[i])
        } else {
            return desArr.join('\n')
        }
    }
}
module.exports.do = (filePath, filename) => {
    nodes = []
    let edgeCount = 0
    new AdmZip(filePath).getEntries().forEach(
        zipEntry => {
            if (!zipEntry.isDirectory) {
                a = zipEntry.getData().toString('utf8').split('\n')
                nodes.push(
                    {
                        name: zipEntry.name,
                        nodes: a[0].replace(/(\]|\[|'|)/g, "").split(", "),
                        info: getInfo(a)
                    }
                )
            }
        }
    )
    console.log(nodes.length)
    let ids = fbase.getKeys()
    nodes.forEach(
        n => {
            let k = ids[n.name]
            let uid
            if (!k) {
                uid = fbase.writeInfo(
                    {
                        id: n.name,
                        name: n.name.replace(/_/g, " "),
                        info: n.info
                    }
                )
            } else {
                uid = k.uid
            }
            n.uid = uid
        }
    )

    //let nids = R.indexBy(R.prop("name"), nodes)
    nodes.forEach(
        n => {
            let childNodes = []
            n.nodes.forEach(cn=>{
                if (ids[cn])
                childNodes.push(ids[cn].uid)
                edgeCount++
            })
            n.nodes = childNodes
        }
    )

    fbase.newData({
        name:filename.replace(/\./g,'_'),
        graph: nodes.map(n=>{
            return {
                uid:n.uid,
                nodes:n.nodes
            }
        }),
        edgeCount:edgeCount
    })

}


