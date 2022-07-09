function formatedDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
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

function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(".clouds").innerHTML =
    response.data.weather[0].description;
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
  temperature.innerHTML = `77`;
}

function showCelcium(event) {
  event.preventDefault();
  let temperature = document.querySelector(".current-temperature");
  temperature.innerHTML = `25`;
}

let date = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatedDate(date);

let formEnterCity = document.querySelector("#citySearch");
formEnterCity.addEventListener("submit", findCity);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celcium = document.querySelector("#celcium");
celcium.addEventListener("click", showCelcium);

cityByDefault("Kyiv");

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", showCurrentLocation);

console.log(hello.world);
