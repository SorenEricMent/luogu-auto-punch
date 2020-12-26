console.log("Luogu AutoPunch By WinslowEric.CN");
const needle = require('needle');
var loopInterval = "86400000";
var ua = ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.60", "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36", "Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1041.0 Safari/535.21", "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0; Touch; MASMJS)", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36"];
//UA列表 可以自己扩充
var accountArray = [{
	"cookie" : "__client_id=【你的Client ID】;_uid=【你的UID】;"
}];
//账号数组 支持多账号签到 加到json就行了~

function signRequest(accountArray, uaArray) {
	var accountNum = accountArray.length;
	for ( i = 0; i < accountNum; i++) {
		var userAgent = uaArray[Math.floor(Math.random() * (uaArray.length - 1))];
		needle.request('GET', 'https://www.luogu.com.cn/index/ajax_punch', "", {
			headers : {
				"Host" : "www.luogu.com.cn",
				"User-Agent" : userAgent,
				"Accept" : "*/*",
				"Accept-Language" : "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
				"Accept-Encoding" : "gzip, deflate, br",
				"Connection" : "keep-alive",
				"Referer" : "https://www.luogu.com.cn/",
				"Cache-Control" : "no-cache",
				"Cookie" : accountArray[i].cookie
			}
		}, function(error, response) {
			// 成功
			if (!error && response.statusCode == 200) {
				console.log("Account with cookie:" + JSON.stringify(currentUser) + " signed,response body:" + JSON.stringify(response));
			} else {
				console.log("Error on account with cookie:" + JSON.stringify(currentUser) + " ,response body:" + JSON.stringify(response));
			}
		});
	}
}

signRequest(accountArray, ua);
setInterval(function() {
	signRequest(accountArray, ua);
}, loopInterval);
