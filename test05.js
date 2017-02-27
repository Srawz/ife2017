var system = require('system');
var page = require('webpage').create();
var keyWord = 'ife';
var url = 'http://www.baidu.com/s?wd=' + encodeURIComponent(keyWord);
var beginTime = Date.now();
var dev = {
	ipad : {
		ua : 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
		width : 768,
		height : 1024
	},
	iphone6 : {
		ua : 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
		width : 375,
		height : 667
	},
	iphone5 : {
		ua : 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
		width : 320,
		height : 568
	}
};
var minput = system.args[1];
page.settings.userAgent = dev[minput].ua;
page.viewportSize = { width: dev[minput].width, height: dev[minput].height };
page.open(url, function(e) {


	page.includeJs("http://libs.baidu.com/jquery/1.9.1/jquery.min.js", function() {

		var result = page.evaluate(function() {
			var result = {
				code: 1,
				msg: '抓取成功',
        time: '',
        word: '',
				dataList: []
			}
			var res = $('.result');
			res.each(function() {
				var imgs = $(this).find('.c-img')
				result.dataList.push({
					title: $(this).children('h3').text(),
					info: $(this).find('.c-abstract').text(),
					link: $(this).find('h3 a').attr('href'),
					pic: imgs.length > 0 ? imgs[0].src : ''
				})
			})
			return result;
		})
		result.time = Date.now() - beginTime;
		result.word = keyWord;
		console.log(JSON.stringify(result));
		phantom.exit();
	})
})
