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
