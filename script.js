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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
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
  changeVideo(response.data.weather[0].main);
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weekForecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col WeatherForecastPreview">
              <div class="DayOfAWeek">${formatDay(forecastDay.dt)}</div>
              <img src = "http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt = "Weather Icon"
              width = "42"
              />
              <div class="temperature-max">${Math.round(
                forecastDay.temp.max
              )}ºC</div>
              <div class="temperature-min">${Math.round(
                forecastDay.temp.min
              )}ºC</div>
            </div>`;
    }
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
  fahrenheitLink.classList.remove("active");
  celciumLink.classList.add("active");
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
  document.querySelector("#current-temperature").innerHTML = Math.round(
    (celcium * 9) / 5 + 32
  );
  celciumLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelcium(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celcium);
  fahrenheitLink.classList.remove("active");
  celciumLink.classList.add("active");
}

function changeVideo(backgroundWeather) {
  let vid = document.querySelector("#myVideo");
  if (backgroundWeather === "Clouds") {
    vid.src =
      "https://res.cloudinary.com/ds1ktvqk1/video/upload/v1658422816/pexels-miguel-%C3%A1-padri%C3%B1%C3%A1n-6772574_1_pwmphc.mp4";
  }
  if (backgroundWeather === "Rain") {
    vid.src =
      "https://res.cloudinary.com/ds1ktvqk1/video/upload/v1658422816/pexels-miguel-%C3%A1-padri%C3%B1%C3%A1n-6772574_1_pwmphc.mp4";
  }
  if (backgroundWeather === "Clear") {
    vid.src =
      "https://res.cloudinary.com/ds1ktvqk1/video/upload/v1656843865/3182862569_ex7wdq.mp4";
  }
  if (backgroundWeather === "Snow") {
    vid.src =
      "https://res.cloudinary.com/ds1ktvqk1/video/upload/v1658422793/video_cthjgt.mp4";
  }
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
