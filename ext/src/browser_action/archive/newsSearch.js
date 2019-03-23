
let key = 'f149e7bbd82a499b9554a152cc835be8';
let host = 'https://api.cognitive.microsoft.com';
let path = '/bing/v7.0/news/search';
let term =  'workplace diversity'; //add input 

var headlines =["headline1", "headline2", "headline3"];
var descs = ["desc1", "desc2", "desc3"];

fetch (host + path + '?q=' + encodeURIComponent(term) + '&count=3', 
	{ headers: { "Ocp-Apim-Subscription-Key" : key}})
.then((resp) => resp.json())
.then((body) => { 

	for(var i=0;i<3;i++){
		var hl = document.getElementById(headlines[i]);
		hl.innerHTML = '<a href="'+body.value[i].url+'">'+body.value[i].name+'</a>'; 
		var desc = document.getElementById(descs[i]);	
		desc.innerHTML = body.value[i].description;
	}
})
