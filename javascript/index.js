function getLocationURL(){
	var locationData = 'Unable to get location data';
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position, locationData){
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			locationData = 'http://api.openweathermap.org/data/2.5/weather?appid=a0f3e953a155f5379207c7171a7723a5&lat='+latitude+'&lon='+longitude;
			console.log(locationData);
			getLocation(locationData);
			getConditions(locationData);
//			var unit = units(locationData);
			units(locationData);
			$("[name='optradio']").click(function() {
				if($('#Imperial').is(':checked') ||  $('#Metric').is(':checked') || $('#SIUnits').is(':checked')){ 
					units(locationData); 
//					alert('This is a click');
				}
			});
		});
	}
	return locationData;
}

function units(locationURL){
	var units = {measure: '&units=imperial', display: 'F'};
	if(document.getElementById('Metric').checked){
		units.measure = '&units=metric';
		units.display = 'C';
		} else if(document.getElementById('SIUnits').checked){
			units.measure = '';
			units.display = 'K';
				// Per API Doc, setting the units blank will give us degrees in Kalvin
		}
	var weatherDataURL = {url: locationURL+units.measure, display: units.display}
	getTemperature(weatherDataURL.url, weatherDataURL.display)
//	return weatherDataURL;
}

function getLocation(locationURL){
	var city = 'Unable to get city';
	var data = $.getJSON(locationURL, function(json){
		data = json;
		city = data.name;
		$('#city').text(city);
//		return city;
	});
}

function getConditions(locationURL){
	var conditions = 'Unable to get conditions';
	var data = $.getJSON(locationURL, function(json){
		data = json;
		conditions = data.weather[0].main;
		var conditionCode = data.weather[0].id;
		var conditionDes = data.weather[0].icon;
		$('#conditions').text(conditions);
		showConditions(conditionCode);
		if(conditionCode == 741){
			setBackground('fog');
		} else{
			setBackground(conditionDes);
		}
//		return conditions;
	});
}

function getTemperature(locationURL, units){
	var temp = 'Unable to get temperature';
	var data = $.getJSON(locationURL, function(json){
		data = json;
		temp = data.main.temp;
		$('#temperature').text(temp + '\u00B0' + units);
//		return temp;
	});
}

function showConditions(condition){
	var conditionCode = condition;
	var conditionIcon = 'Unable to get icon';
	if(conditionCode == 800){
		conditionIcon = 'wi-day-sunny';
	} else if(conditionCode <= 202 && conditionCode >= 200){
		conditionIcon = 'wi-storm-storm';
	} else if((conditionCode <= 212 && conditionCode >= 210) || conditionCode == 221){
		conditionIcon = 'wi-lightning';
	} else if(conditionCode <= 232 && conditionCode >= 200){
		conditionIcon = 'wi-storm-showers';
	} else if(conditionCode <= 321){
		conditionIcon = 'wi-sprinkle';
	} else if(conditionCode >= 500 && conditionCode <= 511){
		conditionIcon = 'wi-rain';
	} else if(conditionCode >= 520 && conditionCode <= 531){
		conditionIcon = 'wi-showers';
	} else if((conditionCode >= 600 && conditionCode <= 602) || (conditionCode >= 620 && conditionCode <= 622)){
		conditionIcon = 'wi-snow';
	} else if(conditionCode == 611 || conditionCode == 612){
		conditionIcon = 'wi-sleet';
	} else if(conditionCode == 615 || conditionCode == 616){
		conditionIcon = 'wi-rain-mix';
	} else if(conditionCode == 701){
		conditionIcon = 'wi-showers';
	} else if(conditionCode == 721){
		conditionIcon = 'wi-dust';
	} else if(conditionCode == 741){
		conditionIcon = 'wi-fog';
	} else if(conditionCode <= 803 && conditionCode >= 801){
		conditionIcon = 'wi-cloudy-gusts';
	} else if(conditionCode == 804){
		conditionIcon = 'wi-cloudy';
	} else if(conditionCode == 903){
		conditionIcon = 'wi-snowflake-cold';
	} else if(conditionCode == 904){
		conditionIcon = 'wi-hot';
	} else if(conditionCode == 905){
		conditionIcon = 'wi-windy';
	} else if(conditionCode == 906){
		conditionIcon = 'wi-hail';
	} else if(conditionCode == 951){
		conditionIcon = 'wi-strong-wind';
	} else{
		return;
	}
	$('#conditionIcon').addClass('wi '+ conditionIcon);
}

function setBackground(description){
	if(description == 'fog'){
		coverBackground('https://s24.postimg.org/j1ynfy1wl/10943661_1007643725916615_4432516755788721859_o.jpg');
	}
	else if(description.includes('01') || description.includes('02')){
		coverBackground('https://s24.postimg.org/3pewlx2qt/2016_04_04_15_27_13.jpg');
//$('body').css('background', "url('http://i.imgur.com/eRIDcnJ.jpg')") // Sunny day
	} else if(description.includes('03') || description.includes('04')){
		coverBackground('https://s24.postimg.org/5wj59u811/10629599_922224104458578_8537811592172204077_n.jpg');
	} else if(description.includes('09') || description.includes('10')){
		coverBackground('https://s24.postimg.org/923r01qn9/10433103_1067499553264365_4691072983863503814_n.jpg');
	} else if(description.includes('11')){
		coverBackground('https://c2.staticflickr.com/4/3392/3666839817_4ffef2e691_b.jpg');
	} else if(description.includes('13')){
		coverBackground('https://upload.wikimedia.org/wikipedia/commons/4/46/New_Snow,_Tuolumne_River,_Yosemite_5-15_(19923125003).jpg');
	} else if(description.includes('50')){
		coverBackground('https://s24.postimg.org/kv1k49n39/haze.png');
//		$('body').css('background', "url('http://alg.umbc.edu/usaq/images/lick-20111221.jpg')") // Hazy day
	}
}

function coverBackground(condition){
	$('body').css('background', "url('"+condition+"')");
	$('body').css('webkit-background-size', 'cover');
	$('body').css('-moz-background-size', 'cover');
	$('body').css('-o-background-size', 'cover');
	$('body').css('background-size', 'cover');
}

$(document).ready(function(){
	getLocationURL();
});


