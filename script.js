function formatedDate(date) {
  let hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (hours >= 7 && hours <= 19) {
    document.body.style.coverOverlay = "Green";
  }
  let minutes = date.getMinutes();
  let mins = ("0" + minutes).slice(-2);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${mins}`;
}

function getWeatherForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "9549d1243cd3ebb69e853ea242123151";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;

  celcium = response.data.main.temp;

  document.querySelector("#current-temperature").innerHTML =
    Math.round(celcium);
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(".clouds").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#weatherIcon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  getWeatherForecast(response.data.coord);
}

function showForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#weekForecast");

  let forecastHTML = "";
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col WeatherForecastPreview">
              <div class="DayOfAWeek">${day}</div>
              <img />
              <div class="temperature-max">24ºC</div>
              <div class="temperature-min">19ºC</div>
            </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}

function cityByDefault(city) {
  let apiKey = "9549d1243cd3ebb69e853ea242123151";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

function findCity(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearchInput").value;
  cityByDefault(city);
}

function findLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9549d1243cd3ebb69e853ea242123151";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".current-temperature");
  temperature.innerHTML = Math.round((celcium * 9) / 5 + 32);
  celciumLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelcium(event) {
  event.preventDefault();
  let temperature = document.querySelector(".current-temperature");
  temperature.innerHTML = Math.round(celcium);
  fahrenheitLink.classList.remove("active");
  celciumLink.classList.add("active");
}

let celcium = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celciumLink = document.querySelector("#celcium");
celciumLink.addEventListener("click", showCelcium);

let date = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatedDate(date);

let formEnterCity = document.querySelector("#citySearch");
formEnterCity.addEventListener("submit", findCity);

cityByDefault("Kyiv");

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", showCurrentLocation);
