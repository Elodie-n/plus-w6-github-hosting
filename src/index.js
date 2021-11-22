function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let now = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = "0" + currentHours;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = "0" + currentMinutes;
  }

  let formattedDate = `${currentDay} ${currentHours}:${currentMinutes}`;

  return formattedDate;
}

let h2 = document.querySelector("h2");
h2.innerHTML = formatDate(now);

function searchCity(city) {
  let apiKey = "61ad5ead7089043a8ec9889fa5a99038";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function submitCountry(country) {
  country.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let searchCountry = document.querySelector("#search-form");
searchCountry.addEventListener("submit", submitCountry);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperature;
  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;
  let newCity = document.querySelector("h1");
  newCity.innerHTML = response.data.name;

  function unitC(event) {
    event.preventDefault();
    let linkC = document.querySelector("#temperature");
    linkC.innerHTML = temperature;
  }
  let unitLinkC = document.querySelector("#celsius");
  unitLinkC.addEventListener("click", unitC);

  function linkF(event) {
    event.preventDefault();
    let linkF = document.querySelector("#temperature");
    linkF.innerHTML = Math.round((temperature * 9) / 5 + 32);
  }
  let unitLinkF = document.querySelector("#fahrenheit");
  unitLinkF.addEventListener("click", linkF);
}

searchCity("Paris");

function retrievePosition(position) {
  let apiKey = "61ad5ead7089043a8ec9889fa5a99038";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  function showWeather(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = temperature;
    let description = document.querySelector("#temperature-description");
    description.innerHTML = response.data.weather[0].description;
    let newCity = document.querySelector("h1");
    newCity.innerHTML = response.data.name;

    function unitC(event) {
      event.preventDefault();
      let linkC = document.querySelector("#temperature");
      linkC.innerHTML = temperature;
    }
    let unitLinkC = document.querySelector("#celsius");
    unitLinkC.addEventListener("click", unitC);

    function linkF(event) {
      event.preventDefault();
      let linkF = document.querySelector("#temperature");
      linkF.innerHTML = Math.round((temperature * 9) / 5 + 32);
    }
    let unitLinkF = document.querySelector("#fahrenheit");
    unitLinkF.addEventListener("click", linkF);
  }

  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);
