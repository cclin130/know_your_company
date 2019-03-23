
document.getElementById("myButton").addEventListener("click", myFunction);

function myFunction(){

	var hostname;
	chrome.tabs.query({
		    active: true,
		    lastFocusedWindow: true
		}, function(tabs) {
		    var tabURL = tabs[0].url;

		 	//find & remove protocol (http, ftp, etc.) and get hostname

			 if (tabURL.indexOf("www") > -1) {
			     hostname = tabURL.split('.')[1];
			 } else if (tabURL.indexOf("http") > -1){
			   hostname = tabURL.split('.')[0];
			 } else {
			     hostname = tabURL.split('.')[0];
			 }
			 if(hostname.indexOf("//") > -1){
			   hostname = hostname.split('/')[2];
			 } else if (hostname.indexOf("/") > -1){
			   hostname = hostname.split('/')[1];
			 }

			 console.log(hostname);
		});

}