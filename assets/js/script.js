// URL to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + 
"q=Bujumbura,Burundi&appid=" + "ca9a418a4d32b4e7e9b0dd38e0c6a28d";

// Today's weather
// AJAX call to the OpenWeatherMap API

$.ajax({
  url: queryURL,
  method: "GET"
})
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);
    
    // Current weather heading
    // define city's name, today's date in the required format using moment.js
    var city = response.name;
    var today = moment().format('DD/M/YYYY');
    // create h2 to display city + current day + current weather icon
    var currentWeatherHeadingEl = $('<h2>').text(city + ' (' + today + ')');
    
    // Current weather icon
    // get the weather icon for the city
    var weatherIcon = response.weather[0].icon;
    var currentWeatherIconURL = "https://openweathermap.org/img/wn/" + weatherIcon + '.png';
    // create img element to display icon
    var iconEl = $('<img>').attr({id: 'current-weather-icon', src: currentWeatherIconURL, alt: 'WeatherIcon'})


    //create list of current weather details
    var currentWeatherListEl = $('<ul>')
    
    // temperature in celcius, code adopted from challenges in class
    var tempC = response.main.temp - 273.15;

    // Define the list of element to append to the currentWeatherList 
    var tempEl = $('<li>').text('Temp: ' + tempC.toFixed(2) + " °C");
    var WindEl = $('<li>').text('Wind: ' + response.wind.speed + ' MPH');
    var HumdityEl = $('<li>').text('Humidity: ' + response.main.humidity + '%');

    // Append all items together to the ul list
    currentWeatherListEl.append(tempEl, WindEl, HumdityEl);
    
    // define current weather div
    var currentWeatherEl = $('<div>').attr({id: 'current-weather'});
    //append current weather div to #today section
    $('#today').append(currentWeatherEl);
    //append current weather heading to current weather div
    currentWeatherEl.append(currentWeatherHeadingEl);
    //append icon to current weather header
    currentWeatherHeadingEl.append(iconEl);
    //append ul to current weather
    currentWeatherEl.append(currentWeatherListEl);
    });

