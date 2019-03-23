var url = chrome.runtime.getURL("data/employeediversity.json")
var someObject = fetch(url).then(
					    function(response) {
					    	return response.json();
					    }).then(function(myJson) {
					 		console.log(myJson)
					 		console.log(myJson.[hostname][0]["%Female"]);
					    }
					  )
					  .catch(function(err) {
					    console.log('Fetch Error :-S', err);
					  });



var values_gender = [38, 62]
var values_ethnicity = [49, 32, 6, 8, 4, 1]
var colors = ["#f7adce", "#7fd3f7", "#84f2b3", "#c49bdf", "#ffde17", "#ffa980", "#7b7bff"]

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

