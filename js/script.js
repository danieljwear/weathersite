

//Menu
function toggleMenu() {
	document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
}

//Date 

var day =  {weekday: 'long'};
var wd =  new Date().toLocaleDateString('en-us', day);

var dMonth =  {day: 'numeric'};
var md=  new Date().toLocaleDateString('en-us', dMonth);

var month= { month: 'long'};
var m =  new Date().toLocaleDateString('en-us',month);

var year =  { year: 'numeric'};
var y =  new Date().toLocaleDateString('en-us', year);

document.getElementById("today").innerHTML = wd +", "+md+" "+m+" "+y;


//Temputure

var tempF = parseFloat(document.getElementById('currenttemp').innerHTML);
var speed = parseFloat(document.getElementById('windspeed').innerHTML);

var windchill =
  35.74 +
  0.6215 * tempF -
  35.75 * Math.pow(speed, 0.16) +
  0.4275 * tempF * Math.pow(speed, 0.16);

windchill = Math.round(windchill);
document.getElementById('windchill').innerHTML = windchill;


// town events
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);

var townData = "";
function httpRequest(address) {
  var req = new XMLHttpRequest();
  req.open('GET', address, false);
  req.send();
  return JSON.parse(req.response);
}

function loadTown(search){
  if(townData == ""){
    townData = httpRequest('https://byui-cit230.github.io/weather/data/towndata.json');
    townData = townData.towns;
  }
  for(var city in townData){
    if(townData[city].name==search)
      return townData[city];
  }
}




var filenames = ['fishhaven.html','preston.html','sodasprings.html'];
var fullnames = ['Fish Haven','Preston','Soda Springs'];
var cityName = fullnames[filenames.indexOf(filename)];
var events = loadTown(cityName).events;
document.getElementById('events').innerHTML = events;

