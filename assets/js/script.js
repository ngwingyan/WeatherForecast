// API Key
var key = "ca9a418a4d32b4e7e9b0dd38e0c6a28d";
// URL to query the database - format in Celcius
var todayURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q=Bujumbura,Burundi&appid=" + key + "&units=metric";

/* today weather */
// AJAX call to the OpenWeatherMap API

function today() {
  $.ajax({
    url: todayURL,
    method: "GET"
  })
    .then(function (todayweather) {
      // testing part  
      // Log the queryURL
      console.log(todayURL);

      // Log the result object
      console.log(todayweather);

      // Current weather header
      // Define city's name, today's date in the required format using moment.js
      var city = todayweather.name;
      var today = moment().format("DD/M/YYYY");
      // create h2 to display city + current day + current weather icon
      var currentWeatherHeaderEl = $("<h2>").text(city + " (" + today + ")");

      // Current weather icon
      // Get the weather icon for the city
      var weatherIcon = todayweather.weather[0].icon;
      // Icon URL source from https://openweathermap.org/weather-conditions
      var currentWeatherIconURL = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
      // Create img element to display icon
      var iconEl = $("<img>").attr({ id: "current-weather-icon'", src: currentWeatherIconURL, alt: "WeatherIcon" })

      // Define the elements to append
      var tempEl = $("<p>").text("Temp: " + todayweather.main.temp + " °C");
      var windEl = $("<p>").text("Wind: " + todayweather.wind.speed + " MPH");
      var humdityEl = $("<p>").text("Humidity: " + todayweather.main.humidity + "%");

      // To display
      // Append icon to current weather header
      currentWeatherHeaderEl.append(iconEl);
      // Set up current weather div
      var currentWeatherdivEl = $("<div>").addClass("current");
      // Append current weather heading and list to current weather div
      currentWeatherdivEl.append(currentWeatherHeaderEl, tempEl, windEl, humdityEl);
      // Append current weather div to #today section
      $("#today").append(currentWeatherdivEl);

      // Pull out the latitude and longitude for the city 
      var citylat = todayweather.coord.lat;
      var citylon = todayweather.coord.lon;
      forecast(citylat, citylon);
    })
};


/* forecast weather */

function forecast(citylat, citylon) {
  // format in Celcius
  var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + citylat + "&lon=" + citylon + "&appid=" + key + "&units=metric";
  $.ajax({
    url: forecastURL,
    method: "GET"
  })
    .then(function (forecastdata) {
      // testing part
      // Log the queryURL
      console.log(forecastURL);

      // Log the result object
      console.log(forecastdata);

      // Header part
      //create h3 header for 5-day forecast
      var forecastHeaderEl = $("<h3>").text("5-Day Forecast:").addClass("col-12");
      $("#forecast").append(forecastHeaderEl);

      // Card part
      for (var i = 0; i < 5; i++) {
        var forecastDate = moment().add(i + 1, "days").format("DD/M/YYYY");
        var cardContainerEl = $("<div>").addClass("card-group");
        var cardDivEl = $("<div>").addClass("card");
        var cardTitleEl = $("<h4>").addClass("card-title").text(forecastDate);
        var cardBodyDivEl = $("<div>").addClass("card-body");
        

        // display information 24 hours later
        var k = ((i + 1) * 8) - 1
        var forecastIcon = forecastdata.list[k].weather[0].icon;
        var forecastIconEl = $("<img>").attr({ src: "https://openweathermap.org/img/wn/" + forecastIcon + ".png", alt: "Weather Icon" });

        // Define the elements to append
        var forecastTempEL = $("<p>").addClass("card-text").text("Temp: " + forecastdata.list[k].main.temp + " °C");
        var forecastWindEL = $("<p>").addClass("card-text").text("Wind: " + forecastdata.list[k].wind.speed + " MPH")
        var forecastHumidityEL = $("<p>").addClass("card-text").text("Humidity: " + forecastdata.list[k].main.humidity + "%")
        
        // To display        
        // append card title, icon, temp, wind, humdity element to card body div
        cardBodyDivEl.append(cardTitleEl, forecastIconEl, forecastTempEL, forecastWindEL, forecastHumidityEL);
        // append card body to card div
        cardDivEl.append(cardBodyDivEl);
        // append card dvi to card container
        cardContainerEl.append(cardDivEl);
        // append card container to section ID forecast
        $("#forecast").append(cardContainerEl);
      };
    })
};

today();