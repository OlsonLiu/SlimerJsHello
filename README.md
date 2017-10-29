## 新手寫Javascript Test 筆記

前述 : 本文介紹的是關於網路爬蟲抓資料的方向, 而工具是SlimerJS, 也順便給自己做個提醒和筆記  
雖然它的功能主要是用於做html的test case, 但本文幾乎沒用到test case的宣告和function

## 一些小問題與回答
1. 學這個要會哪些語言呢?  
Ans : 如果是要用SlimerJS的話，基礎的html, css, javascript是不可缺少的
2. 作者寫這個的用意是?  
Ans : 一些自我提醒而已, 順便看看能不能給不熟的一點參考, 順便熟悉Markdown
3. 為什麼不用PhantomJs?  
Ans :原因有很多, PJS的優勢主要是headless, 缺點卻也不少, 但最主要的原因是Slimer有支援ES6,   
能用ES6寫JS是很愉快的事情, 而且還能熟悉趨勢

前置準備
=======
* firefox ver54以下 - Slimer的預設路徑 C:\Program Files (x86)\Mozilla Firefox  
Slimer的core是Gecko, 會將你的firefox打開並執行code step
* [Slimerjs](https://slimerjs.org/download.html/)
* 一些開發工具, ex : Sublime_text

寫個Hello World
===============
可以參考官方document[官方](https://docs.slimerjs.org/current/quick-start.html/),   
先在根目錄下新增一個
HelloWorld.js, 內容寫上
```
var fs = require('fs');
var page = require('webpage').create();
page.open("http://slimerjs.org", function(status){
     if (status == "success") {
         console.log("The title of the page is: "+ page.title);
     }
     else {
         console.log("Sorry, the page is not loaded");
     }
     	page.render('test.png');
		page.close();
		slimer.exit();
	});
```
## 語法解釋
1. page : Slimer的最基礎物件, 打開網頁以及操作網頁中的DOM都靠它
2. slimer.exit : 執行時會打開一個virtual window, 這段會直接關掉該視窗
3. page.render : 截圖用, 會將你目前開啟的網頁截圖到%Slimer_path%中

## 執行方法
到根目錄中, 假設你安裝到C:\slimer, 進入cmd中
```
cd C:\slimer
slimerjs HelloWorld.js
``` 
好!!執行完畢  
你將會得到cmd中的訊息
> The title of the page is: SlimerJS

並且在你的%Slimer_path%中會出現一個test.png, 裡面是你剛剛進入的[Slimer](http://slimerjs.org)的截圖  

Hello World目前到這邊, 有空會再逐步增加ES6及page.evaluate()的語法



