var hostname;
chrome.tabs.query({
	    active: true,
	    lastFocusedWindow: true
	}, function(tabs) {
	    var tabURL = tabs[0].url;

	    //get hostname from URL
	    get_hostname(tabURL);

		//get pie charts using hostname
		get_charts(hostname);

		//get news calls and display
		news_search(hostname);

		var name = document.getElementById("name");
		name.innerHTML = hostname;
	});

function get_hostname(data){
	 //find & remove protocol (http, ftp, etc.) and get hostname

	 if (data.indexOf("www") > -1) {
	     hostname = data.split('.')[1];
	 } else if (data.indexOf("http") > -1){
	   hostname = data.split('.')[0];
	 } else {
	     hostname = data.split('.')[0];
	 }
	 if(hostname.indexOf("//") > -1){
	   hostname = hostname.split('/')[2];
	 } else if (hostname.indexOf("/") > -1){
	   hostname = hostname.split('/')[1];
	 }
}

function get_charts(company){
	var url = chrome.runtime.getURL("data/employeediversity.json")
	var colors = ["#f7adce", "#7fd3f7", "#84f2b3", "#c49bdf", "#ffde17", "#ffa980", "#7b7bff"]
	var values_gender;
	var values_ethnicity;

	var someObject = fetch(url).then(
						    function(response) {
						    	return response.json();
						    }).then(function(myJson) {
						    	var stats = myJson[company][0];
						    	values_gender = [stats["%Female"], stats["%Male"]];
						    	values_ethnicity = [stats["%White"], stats["%Asian"], stats["%Latino"], stats["%Black"],
						    						stats["%Multi"], stats["%Other"]];

						 		console.log(myJson[company][0]);

						 		make_charts(values_gender, values_ethnicity, colors)
						    }
						  )
						  .catch(function(err) {
						    console.log('Company name not found', err);

						    make_empty_chart();


						  });
}

function make_charts(values_gender,values_ethnicity ,colors){
	var pie = new d3pie("pieChart_gender", {

		"size": {
			"canvasWidth": 200,
			"canvasHeight": 200,
			"pieOuterRadius": "100%"
		},
		"data": {
			"sortOrder": "value-desc",
			"content": [
				{
					"label": "female",
					"value": values_gender[0],
					"color": colors[2]
				},
				{
					"label": "male",
					"value": values_gender[1],
					"color": colors[3]
				}
			]
		},
		"labels": {
			"outer": {
				"format": "none",
				"pieDistance": 100
			},
			"inner": {
				"format": "label-percentage2",
				"hideWhenLessThanPercentage": 5
			},
			"mainLabel": {
				"color": "#000000",
				"font": "exo",
				"fontSize": 12
			},
			"percentage": {
				"color": "#000000",
				"font": "exo",
				"fontSize": 12,
				"decimalPlaces": 0
			},
			"value": {
				"color": "#000000",
				"font": "exo",
				"fontSize": 12
			},
			"lines": {
				"enabled": true
			},
			"truncation": {
				"enabled": true
			}
		},
		"effects": {
			"pullOutSegmentOnClick": {
				"effect": "linear",
				"speed": 400,
				"size": 8
			},
			"highlightSegmentOnMouseover": false,
			"highlightLuminosity": 0.7
		}
	});

	var pie = new d3pie("pieChart_ethnicity", {

		"size": {
			"canvasWidth": 200,
			"canvasHeight": 200,
			"pieOuterRadius": "100%"
		},
		"data": {
			"sortOrder": "value-desc",
			"content": [
				{
					"label": "white",
					"value": values_ethnicity[0],
					"color": colors[0]
				},
				{
					"label": "asian",
					"value": values_ethnicity[1],
					"color": colors[1]
				},
				{
					"label": "latino",
					"value": values_ethnicity[2],
					"color": colors[2]
				},
				{
					"label": "black",
					"value": values_ethnicity[3],
					"color": colors[3]
				},
				{
					"label": "multi",
					"value": values_ethnicity[4],
					"color": colors[4]
				},
				{
					"label": "other",
					"value": values_ethnicity[5],
					"color": colors[5]
				}
			]
		},
		"labels": {
			"outer": {
				"format": "none",
				"pieDistance": 100
			},
			"inner": {
				"format": "label-percentage2",
				"hideWhenLessThanPercentage": 5
			},
			"mainLabel": {
				"color": "#000000",
				"font": "exo",
				"fontSize": 12
			},
			"percentage": {
				"color": "#000000",
				"font": "exo",
				"fontSize": 12,
				"decimalPlaces": 0
			},
			"value": {
				"color": "#000000",
				"font": "exo",
				"fontSize": 12
			},
			"lines": {
				"enabled": true
			},
			"truncation": {
				"enabled": true
			}
		},
		"effects": {
			"pullOutSegmentOnClick": {
				"effect": "linear",
				"speed": 400,
				"size": 8
			},
			"highlightSegmentOnMouseover": false,
			"highlightLuminosity": 0.7
		}
	});
}

function make_empty_chart(){
	var pie = new d3pie("pieChart_gender", {

		"header": {
			"title": {
				"text": "no data available",
				"font": "exo",
				"fontSize": 12,
			},
			"location": "pie-center",
			"titleSubtitlePadding": 9
		},
		"size": {
			"canvasHeight": 200,
			"canvasWidth": 200,
			"pieOuterRadius": "100%"
		},
		"data": {
			"sortOrder": "value-desc",
			"content": [
				{
					"label": " ",
					"value": 1,
					"color": "#efefef"
				}
			]
		},
		"labels": {
			"outer": {
				"format": "none",
				"pieDistance": 100
			},
			"inner": {
				"format": "label"
			},
			"mainLabel": {
				"font": "exo",
				"fontSize": 12
			},
			"percentage": {
				"color": "#ffffff",
				"decimalPlaces": 0
			},
			"value": {
				"color": "#adadad",
				"fontSize": 11
			},
			"lines": {
				"enabled": false
			}
		},
		"effects": {
			"pullOutSegmentOnClick": {
				"effect": "linear",
				"speed": 400,
				"size": 8
			},
			"highlightSegmentOnMouseover": false,
			"highlightLuminosity": 0.7
		}
	});

	var pie = new d3pie("pieChart_ethnicity", {

		"header": {
			"title": {
				"text": "no data available",
				"font": "exo",
				"fontSize": 12,
			},
			"location": "pie-center",
			"titleSubtitlePadding": 9
		},
		"size": {
			"canvasHeight": 200,
			"canvasWidth": 200,
			"pieOuterRadius": "100%"
		},
		"data": {
			"sortOrder": "value-desc",
			"content": [
				{
					"label": " ",
					"value": 1,
					"color": "#efefef"
				}
			]
		},
		"labels": {
			"outer": {
				"format": "none",
				"pieDistance": 100
			},
			"inner": {
				"format": "label"
			},
			"mainLabel": {
				"font": "exo",
				"fontSize": 12
			},
			"percentage": {
				"color": "#ffffff",
				"decimalPlaces": 0
			},
			"value": {
				"color": "#adadad",
				"fontSize": 11
			},
			"lines": {
				"enabled": false
			}
		},
		"effects": {
			"pullOutSegmentOnClick": {
				"effect": "linear",
				"speed": 400,
				"size": 8
			},
			"highlightSegmentOnMouseover": false,
			"highlightLuminosity": 0.7
		}
	});
}

function news_search(company){
	var key = 'f149e7bbd82a499b9554a152cc835be8';
	var host = 'https://api.cognitive.microsoft.com';
	var path = '/bing/v7.0/news/search';
	var term =  company + ' workplace diversity'; //add input

	console.log(term);

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
}