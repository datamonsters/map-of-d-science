let fbase = require("./firebase.module")
let host = require("./host.module")




fbase.init(keys=>{
    host.start()

})


