var http = require("http");
var url = require("url");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
var child_process = require("child_process");
var db = mongoose.connection;
//输出连接日志
db.on('error', function callback() {
    console.log("Connection error");
});

db.once('open', function callback() {
    console.log("Mongo working!");
});  
var resultSchema = new mongoose.Schema({
    code: Number,
    msg: String,
    word: String,
    device: String,
    time: Number,
    dataList: [
        {
            info: String,
            link: String,
            pic: String,
            title: String
        }
    ]
});
var Result = mongoose.model('Result', resultSchema);

http.createServer(function(request, response) {
    console.log('request received');
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");

    var queryObj = url.parse(request.url).query;

    var exec = child_process.exec;

    exec('phantomjs test05.js' +
        ' ' + queryObj, function(err, stdout, stderr) {
        if (err) {
            console.error(`exec error: ${error}`);
        } else {
            var result = new Result(JSON.parse(stdout));
            result.save(function(err, result) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(result);
                }
            });

            console.log(stdout);
        }
    });
    response.end();
}).listen(8000);
console.log('server started');
