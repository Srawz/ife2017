var page = require('webpage').create();
var keyWord = 'ife';
var url = 'http://www.baidu.com/s?wd=' + encodeURIComponent(keyWord);
var beginTime = Date.now();
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
					link: $(this).find('h3 a')[0].href,
					pic: imgs.length > 0 ? imgs[0].src : ''
				})
			})
			return result
		})
		result.time = Date.now() - beginTime;
		result.word = keyWord;
		console.log(JSON.stringify(result))
		phantom.exit()
	})
})
