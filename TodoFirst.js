const fs = require('fs');
const page = require('webpage').create();
const url = "http://www.uniqlo.com/tw/store/feature/men/outer/ultralightdown-myuldlife/?ref=_navi_1016"

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