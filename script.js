$(document).ready(function() {
    //var cityList = [];
    // Event handler for user clicking the select-city button
    $("#select-city").on("click", function(event) {
        // Preventing the button from trying to submit the form
        event.preventDefault();
        // Storing the city name
        var city = $("#city-input").val().trim();
        // Clear search box
        $("#city-input").val("");
        $("#weather-current").empty();
        $("#5day1").empty();
        $("#5day2").empty();
        $("#5day3").empty();
        $("#5day4").empty();
        $("#5day5").empty();
        // Running the searchCityWeather function(passing in the city as an argument)
        searchCityWeather(city);        
        });

    $(".searchhistory").on("click", "li", function(event) {
        $("#weather-current").empty();
        $("#5day1").empty();
        $("#5day2").empty();
        $("#5day3").empty();
        $("#5day4").empty();
        $("#5day5").empty();
        searchCityWeather($(this).text());
    
    });
    //add city to searched list
    function addSearchCity(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".searchhistory").prepend(li.addClass("searchLi"));
        
    }

    /////////////clear history//////////////////
    $("#clearBtn").on("click", function(event) {
        $(".searchhistory").empty();
        $("#weather-current").empty();
        $("#5day1").empty();
        $("#5day2").empty();
        $("#5day3").empty();
        $("#5day4").empty();
        $("#5day5").empty();
    });

    function searchCityWeather(city) {
        
        //var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",US&units=imperial&APPID=f6fb8b1aae3ce9e37c1f9a468c2d4be2";
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",US&units=imperial&APPID=f6fb8b1aae3ce9e37c1f9a468c2d4be2";
        $.ajax({
            url: url,
            method: "GET"
        }).then(function(response) {
       // console.log(response);

            window.localStorage.setItem("history", JSON.stringify(city));
    
            addSearchCity(city);
        //clear previous city
        $("#weather-current").empty();
        $("#5day").empty();
        //var cityDate = response.dt;
        //console.log(cityDate);
        var milliseconds = response.dt * 1000;
        var dateObject = new Date(milliseconds);
        //var humanDateFormat = dateObject.toLocaleString();
        dateObject.toLocaleString("en-us", {weekday: "long"})
        dateObject.toLocaleString("en-us", {month: "long"})
        dateObject.toLocaleString("en-us", {day: "numeric"})
        dateObject.toLocaleString("en-us", {year: "numeric"})
        //
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        //console.log(latitude);
        //console.log(longitude);
        var nameCity = response.name;
        var p1 = $("<p class = 'cityName'>").text(nameCity);
        var imgCurrent = response.weather[0].icon;
        var iconurl = "https://openweathermap.org/img/w/" + imgCurrent + ".png";
        var img = $("<img>").attr("src", iconurl);
        var currentDate = dateObject;
        var p2 = $("<p>").text("Date: " + currentDate);
        var currentTemp = Math.round(response.main.temp);
        var p3 = $("<p>").text("Temp: " + currentTemp + "F");
        var currentHumidity = response.main.humidity;
        var p4 = $("<p>").text("Humidity: " + currentHumidity + "%");
        var currentWindSpeed = Math.round(response.wind.speed);
        var p5 = $("<p>").text("Wind Speed: " + currentWindSpeed + "mph");
        //var separator = $("<hr>");
        $("#weather-current").append(img, p1, p2, p3, p4, p5); 

            ///////////////// UV Index ////////////////////////
            function getUvIndex() {
                var url = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=f6fb8b1aae3ce9e37c1f9a468c2d4be2";
    
                $.ajax({
                    url: url,
                    method: "GET"
                }).then(function(response) {
                console.log(response);
                var p6 = $("<p class = 'uv'>").text("UV Index: " + response.value);
                $("#weather-current").append(p6);
                });
            }
            getUvIndex();
        ///////////////////////5 day forecast////////////////////
    
        var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",US&units=imperial&APPID=f6fb8b1aae3ce9e37c1f9a468c2d4be2";
        //var url = "https://api.openweathermap.org/data/2.5/weather?id=524901&units=imperial&APPID=f6fb8b1aae3ce9e37c1f9a468c2d4be2";
        $.ajax({
            url: url,
            method: "GET"
        }).then(function(response) {
      //  console.log(response);
        //var cityDate = response.list[7].dt;
        //console.log(cityDate);
        var milliseconds = response.list[6].dt * 1000;
        var dateObject = new Date(milliseconds);
        
        dateObject.toLocaleString("en-us", {weekday: "long"})
        dateObject.toLocaleString("en-us", {month: "long"})
        dateObject.toLocaleString("en-us", {day: "numeric"})
        dateObject.toLocaleString("en-us", {year: "numeric"})

        var mainCard = $("<div>");//.addClass("col-md-2");
        var indCard = $("<div>").addClass("card bg-primary text-white");
        var body = $("<div>").addClass("card-body p-2");
        var imgCurrent = response.list[6].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + imgCurrent + ".png";
        var img = $("<img>").attr("src", iconurl);
        var currentDate = dateObject;
        var p2 = $("<p>").text("Date: " + currentDate);
        var currentTemp = Math.round(response.list[6].main.temp);
        var p3 = $("<p>").text("Temp: " + currentTemp + "F");
        var currentHumidity = response.list[6].main.humidity;
        var p4 = $("<p>").text("Humidity: " + currentHumidity + "%");
        var currentWindSpeed = Math.round(response.list[6].wind.speed);
        var p5 = $("<p>").text("Wind Speed: " + currentWindSpeed + "mph");
        //var separator = $("<hr>");
        //$("#5day").append(p2, p3, p4, p5, img); 
        mainCard.append(indCard.append(body.append(p2, img, p3, p4, p5)));
        $("#5day1").append(mainCard);
        //////////////////////////////////
        var milliseconds = response.list[14].dt * 1000;
        var dateObject = new Date(milliseconds);
        
        var mainCard = $("<div>");//.addClass("col-md-2");
        var indCard = $("<div>").addClass("card bg-primary text-white");
        var body = $("<div>").addClass("card-body p-2");
        //var nameCity = response.city.name;
        //var p1 = $("<p>").text("City: " + nameCity);
        var imgCurrent = response.list[14].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + imgCurrent + ".png";
        var img = $("<img>").attr("src", iconurl);
        var currentDate = dateObject;
        var p2 = $("<p>").text("Date: " + currentDate);
        var currentTemp = Math.round(response.list[14].main.temp);
        var p3 = $("<p>").text("Temp: " + currentTemp + "F");
        var currentHumidity = response.list[14].main.humidity;
        var p4 = $("<p>").text("Humidity: " + currentHumidity + "%");
        var currentWindSpeed = Math.round(response.list[14].wind.speed);
        var p5 = $("<p>").text("Wind Speed: " + currentWindSpeed + "mph");
        //var separator = $("<hr>");
        //$("#5day").append(p2, p3, p4, p5, img); 
        mainCard.append(indCard.append(body.append(p2, img, p3, p4, p5)));
        $("#5day2").append(mainCard);

        ////////////////////////////////
        var milliseconds = response.list[22].dt * 1000;
        var dateObject = new Date(milliseconds);
        
        var mainCard = $("<div>");//.addClass("col-md-2");
        var indCard = $("<div>").addClass("card bg-primary text-white");
        var body = $("<div>").addClass("card-body p-2");
        //var nameCity = response.city.name;
        //var p1 = $("<p>").text("City: " + nameCity);
        var imgCurrent = response.list[22].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + imgCurrent + ".png";
        var img = $("<img>").attr("src", iconurl);
        var currentDate = dateObject;
        var p2 = $("<p>").text("Date: " + currentDate);
        var currentTemp = Math.round(response.list[22].main.temp);
        var p3 = $("<p>").text("Temp: " + currentTemp + "F");
        var currentHumidity = response.list[22].main.humidity;
        var p4 = $("<p>").text("Humidity: " + currentHumidity + "%");
        var currentWindSpeed = Math.round(response.list[22].wind.speed);
        var p5 = $("<p>").text("Wind Speed: " + currentWindSpeed + "mph");
        //var separator = $("<hr>");
        //$("#5day").append(p2, p3, p4, p5, img); 
        mainCard.append(indCard.append(body.append(p2, img, p3, p4, p5)));
        $("#5day3").append(mainCard);
        /////////////////////////////////////////////////////////////
        var milliseconds = response.list[30].dt * 1000;
        var dateObject = new Date(milliseconds);

        var mainCard = $("<div>");//.addClass("col-md-2");
        var indCard = $("<div>").addClass("card bg-primary text-white");
        var body = $("<div>").addClass("card-body p-2");
        //var nameCity = response.city.name;
        //var p1 = $("<p>").text("City: " + nameCity);
        var imgCurrent = response.list[30].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + imgCurrent + ".png";
        var img = $("<img>").attr("src", iconurl);
        var currentDate = dateObject;
        var p2 = $("<p>").text("Date: " + currentDate);
        var currentTemp = Math.round(response.list[30].main.temp);
        var p3 = $("<p>").text("Temp: " + currentTemp + "F");
        var currentHumidity = response.list[30].main.humidity;
        var p4 = $("<p>").text("Humidity: " + currentHumidity + "%");
        var currentWindSpeed = Math.round(response.list[30].wind.speed);
        var p5 = $("<p>").text("Wind Speed: " + currentWindSpeed + "mph");
        //var separator = $("<hr>");
        //$("#5day").append(p2, p3, p4, p5, img); 
        mainCard.append(indCard.append(body.append(p2, img, p3, p4, p5)));
        $("#5day4").append(mainCard);
        /////////////////////////////////////////////////////////////
        var milliseconds = response.list[38].dt * 1000;
        var dateObject = new Date(milliseconds);

        var mainCard = $("<div>");//.addClass("col-md-2");
        var indCard = $("<div>").addClass("card bg-primary text-white");
        var body = $("<div>").addClass("card-body p-2");
        //var nameCity = response.city.name;
        //var p1 = $("<p>").text("City: " + nameCity);
        var imgCurrent = response.list[38].weather[0].icon;
        var iconurl = "https://openweathermap.org/img/w/" + imgCurrent + ".png";
        var img = $("<img>").attr("src", iconurl);
        var currentDate = dateObject;
        var p2 = $("<p>").text("Date: " + currentDate);
        var currentTemp = Math.round(response.list[38].main.temp);
        var p3 = $("<p>").text("Temp: " + currentTemp + "F");
        var currentHumidity = response.list[38].main.humidity;
        var p4 = $("<p>").text("Humidity: " + currentHumidity + "%");
        var currentWindSpeed = Math.round(response.list[38].wind.speed);
        var p5 = $("<p>").text("Wind Speed: " + currentWindSpeed + "mph");
        //var separator = $("<hr>");
        //$("#5day").append(p2, p3, p4, p5, img); 
        mainCard.append(indCard.append(body.append(p2, img, p3, p4, p5)));
        $("#5day5").append(mainCard);
        });
    });

    
}

});