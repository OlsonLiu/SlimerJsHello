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
const fs = require('fs');
const page = require('webpage').create();
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
4. 已經可以用const來宣告了, 讓我們一起感受ES6的美好 

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


### ECMAscript 6 & SlimerJs
==============================  
接下來講的是 :　如何用Slimer移動到某個website, 並對它進行操作

廢話不多說, 先上程式

假設你今天想要看uniqulo的特價男裝總表
也就是[這一頁](http://www.uniqlo.com/tw/store/feature/men/outer/ultralightdown-myuldlife/?ref=_navi_1016)的商品資訊


```
const fs = require('fs');
const page = require('webpage').create();
const url = "http://www.uniqlo.com/tw/store/feature/men/outer/ultralightdown-myuldlife/?ref=_navi_1016";

page.open(url, function(status){

        const list = page.evaluate(function(){
            return document.querySelectorAll("#blkMainItemList dl.info");
        });

        let show = ``;
        for(let item of list){
            let title = item.querySelector(".thumb a").getAttribute("title");
            let price = item.querySelector("dd.price").textContent;
            show += `${title} 的價格為 :${price} \r\n`;
        }

        fs.write("uniqulo.log",show);
        page.render('test.png');
        page.close();
        slimer.exit();
    });
```
## 執行結果
你應該會得到跟我一樣的結果, 在你的SlimerJs根目錄下有一個 uniqulo.log  
點開後前幾筆資料為 :  
男裝 特級極輕羽絨背心 的價格為 :
        NT$1,490
         
男裝 特級極輕羽絨背心(2016年款式) 的價格為 :
        NT$990
    
## 程式解說
+ page.evaluate : 這是跟Phantom相同的function, evaluate是去你要到的該網頁下的page進行操作,  
如果你要撈取dom 或是對page的javascript做一些事情, 都需要進到evaluate()下去做

+ 另一個值得一提的點是evaluate()scope是sandbox, 也就是油鹽不進,  
你無法從裡面直接取用外部宣告好的variable, 如果真的要依照某個變數做操作,  
你只能把它當作parameter丟進去, 此外別無他法

+ 有看到我秀資料的那一段嗎? 那是template string, ES6的特性, 我們擁抱他.  
直接將參數跟換行符號寫在一行中, 而不需要用傳統JS做的  
``` title + "的價格為 :" + price+ "\r\n"; ```

+ fs.write(), 是將資料寫出成檔案, 還可以傳"w"或"a"的參數來決定是否要overwrite還是append該文件


## 些許心得
如果你執行起來跟我有一樣的感想, "恩...其實好像也不慢嘛",   
這就對了 non-headless雖然好像是它的缺點, 但換來的優點是可以用ES6, 筆者的感想是好太多了,   
需要打開browser這點根本不是問題



