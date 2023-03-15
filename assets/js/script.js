// This is our API key
var APIKey = "ca9a418a4d32b4e7e9b0dd38e0c6a28d";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q=Bujumbura,Burundi&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
// $("#search-button").on("click", function() {
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);

    // today's date
    var today = moment().format('l');
    
    // city
    $(".city").html("<h1>" + response.name + " (" + today +") </h1>");

    // Convert the temp to Celsius
    var tempC = response.main.temp - 273.15;

    // add temp content to html
    $(".temp").text("Temperature (K) " + response.main.temp);
    $(".tempC").text("Temp: "+ tempC.toFixed(2) + "°C");

    // Transfer content to HTML
    $(".wind").text("Wind Speed: " + response.wind.speed + "KPH");
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    


    // Log the data in the console as well
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature: " + tempC);
  })
// });

//   // Adding click event listen listener to all buttons
// $("button").on("click", function() {
//   // Grabbing and storing the data-animal property value from the button
//   var animal = $(this).attr("data-animal");

//   // Constructing a queryURL using the animal name
//   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//     animal + "&api_key=dc6zaTOxFJmzC&limit=10";

//   // Performing an AJAX request with the queryURL
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//     // After data comes back from the request
//     .then(function(response) {
//       console.log(queryURL);

//       console.log(response);
//       // storing the data from the AJAX request in the results variable
//       var results = response.data;

//       // Looping through each result item
//       for (var i = 0; i < results.length; i++) {

//         // Creating and storing a div tag
//         var animalDiv = $("<div>");

//         // Creating a paragraph tag with the result item's rating
//         var p = $("<p>").text("Rating: " + results[i].rating);

//         // Creating and storing an image tag
//         var animalImage = $("<img>");
//         // Setting the src attribute of the image to a property pulled off the result item
//         animalImage.attr("src", results[i].images.fixed_height.url);

//         // Appending the paragraph and image tag to the animalDiv
//         animalDiv.append(p);
//         animalDiv.append(animalImage);

//         // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
//         $("#gifs-appear-here").prepend(animalDiv);
//       }
//     });
// });