var hostname;
chrome.tabs.query({
	    active: true,
	    lastFocusedWindow: true
	}, function(tabs) {
	    var tabURL = tabs[0].url;

	    //get hostname from URL
	    get_hostname(tabURL);
		console.log(hostname);

		//get pie charts using hostname
		get_charts(hostname);

		//get news calls and display
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
						    console.log('Fetch Error :-S', err);
						  });
}

function make_charts(values_gender,values_ethnicity ,colors){
	var pie = new d3pie("pieChart_gender", {

		"size": {
			"canvasWidth": 590,
			"pieOuterRadius": "100%"
		},
		"data": {
			"sortOrder": "value-desc",
			"content": [
				{
					"label": "Female",
					"value": values_gender[0],
					"color": colors[2]
				},
				{
					"label": "Male",
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
				"hideWhenLessThanPercentage": 3
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
			"canvasWidth": 590,
			"pieOuterRadius": "100%"
		},
		"data": {
			"sortOrder": "value-desc",
			"content": [
				{
					"label": "White",
					"value": values_ethnicity[0],
					"color": colors[0]
				},
				{
					"label": "Asian",
					"value": values_ethnicity[1],
					"color": colors[1]
				},
				{
					"label": "Latino",
					"value": values_ethnicity[2],
					"color": colors[2]
				},
				{
					"label": "Black",
					"value": values_ethnicity[3],
					"color": colors[3]
				},
				{
					"label": "Multi",
					"value": values_ethnicity[4],
					"color": colors[4]
				},
				{
					"label": "Other",
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
				"hideWhenLessThanPercentage": 3
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