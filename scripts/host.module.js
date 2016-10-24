let express = require('express');
let app = express();
let path = require('path');
let formidable = require('formidable');
let fs = require('fs');
let unpack = require("./unpack.module")

module.exports.start = (parsefn) => {
    app.use(express.static(path.join(__dirname, 'public')));
    app.get(
        '/', function (req, res) {
            res.sendFile(path.join(__dirname, 'views/index.html'));
        }
    );
    app.post(
        '/upload', function (req, res) {
            let form = new formidable.IncomingForm();
            form.multiples = true;
            form.uploadDir = path.join(__dirname, '/uploads');
            form.on(
                'file', function (field, file) {
                    //let x = fs.rename(file.path, path.join(form.uploadDir, file.name));
                    console.log("new file:", + file.path)
                    unpack.do(file.path, file.name)
                }
            );
            form.on(
                'error', function (err) {
                    console.log('An error has occured: \n' + err);
                }
            );
            form.on(
                'end', function () {
                    res.end('success');
                }
            );
            form.parse(req);
        }
    );

    let server = app.listen(
        3000, function () {
            console.log('Server listening on port 3000');
        }
    )
}