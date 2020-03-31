
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);


//Change Town's API
if (filename=="preston.html") {var api = "https://api.openweathermap.org/data/2.5/weather?id=5604473&APPID=4f0171c9b2ae47c32c472842a6974f54&units=imperial";}
else if  (filename == "sodasprings.html") {var api = 'https://api.openweathermap.org/data/2.5/weather?id=5607916&APPID=4f0171c9b2ae47c32c472842a6974f54&units=imperial';}
else  {var api ='https://api.openweathermap.org/data/2.5/weather?id=5585010&APPID=4f0171c9b2ae47c32c472842a6974f54&units=imperial'}


let weatherRequest = new XMLHttpRequest()
weatherRequest.open('GET', api ,true)

weatherRequest.send()
weatherRequest.onload = function() {
  let weatherData = JSON.parse(weatherRequest.responseText)
  console.log(weatherData)

  document.getElementById('currenttemp').innerHTML = Math.round( weatherData.main.temp)
  document.getElementById('discription').innerHTML =weatherData.weather[0].description
  document.getElementById('humidity').innerHTML = weatherData.main.humidity
  document.getElementById('windspeed').innerHTML = weatherData.wind.speed
  var tempF = parseFloat(document.getElementById('currenttemp').innerHTML)
  var speed = parseFloat(document.getElementById('windspeed').innerHTML)

  var windchill = 35.74 +  0.6215 * tempF - 35.75 * Math.pow(speed, 0.16) +  0.4275 * tempF * Math.pow(speed, 0.16)

  windchill = Math.round(windchill)
  document.getElementById('windchill').innerHTML = windchill
}
//Change Town's  5day API
if (filename=="preston.html") {var api5 = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&APPID=05114d9b05fc90300235d8704185c770&units=imperial";}
else if  (filename == "sodasprings.html") {var api5 = 'https://api.openweathermap.org/data/2.5/forecast?id=5607916&APPID=05114d9b05fc90300235d8704185c770&units=imperial';}
else  {var api5 ='https://api.openweathermap.org/data/2.5/forecast?id=5585010&APPID=05114d9b05fc90300235d8704185c770&units=imperial'}

var weatherForecast = new XMLHttpRequest()
weatherForecast.open( 'GET',api5,  true)
weatherForecast.send()
weatherForecast.onload = function() {
  var weatherData = JSON.parse(weatherForecast.responseText)
  console.log(weatherData)


  var listDate = []
  var listTemp = []
  var listIconCode = []
  var weatherDesc = []

  for (i = 0; i < weatherData.list.length; ++i) {
    time = weatherData.list[i].dt_txt
    if (time.includes('18:00:00')) {
      //date
      var date = new Date(weatherData.list[i].dt * 1000)
      var month = ['January', 'February', 'March',  'April','May',  'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
      var weekDay = [ 'Sunday',    'Monday',  'Tuesday',  'Wednesday',  'Thursday',  'Friday',  'Saturday'  ]
      var findDate =
        weekDay[date.getDay()] +
        '<br>' +
        month[date.getMonth()] +  ' ' +  date.getDate()
      listDate.push(findDate)

      // Temp
      var temp = weatherData.list[i].main.temp
      var temp = Math.round(temp)
      listTemp.push(temp)

      // Icon
      let iconData =
        'https://openweathermap.org/img/w/' +
        weatherData.list[i].weather['0'].icon +
        '.png'
      listIconCode.push(iconData)

      let weatherDescAlt = weatherData.list[i].weather['0'].description
      weatherDesc.push(weatherDescAlt)
    }
    continue
  }

//calls
  document.getElementById('day1').innerHTML = listDate[0]
  document.getElementById('day2').innerHTML = listDate[1]
  document.getElementById('day3').innerHTML = listDate[2]
  document.getElementById('day4').innerHTML = listDate[3]
  document.getElementById('day5').innerHTML = listDate[4]
  document.getElementById('icon1').src = listIconCode[0]
  document.getElementById('icon2').src = listIconCode[1]
  document.getElementById('icon3').src = listIconCode[2]
  document.getElementById('icon4').src = listIconCode[3]
  document.getElementById('icon5').src = listIconCode[4]
  document.getElementById('icon1').alt = weatherDesc[0]
  document.getElementById('icon2').alt = weatherDesc[1]
  document.getElementById('icon3').alt = weatherDesc[2]
  document.getElementById('icon4').alt = weatherDesc[3]
  document.getElementById('icon5').alt = weatherDesc[4]
  document.getElementById('temp1').innerHTML = listTemp[0]
  document.getElementById('temp2').innerHTML = listTemp[1]
  document.getElementById('temp3').innerHTML = listTemp[2]
  document.getElementById('temp4').innerHTML = listTemp[3]
  document.getElementById('temp5').innerHTML = listTemp[4]
  //
}