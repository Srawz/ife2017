var url = 'http://www.baidu.com';
var page = require('webpage').create();
page.onConsoleMessage = function (msg) {
    console.log(msg);
};
page.open(url, function (status) {
    page.evaluate(function () {
    console.info(JSON.stringify(page.cookies))
    });
    phantom.exit();
});
