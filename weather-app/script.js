const apiKey = "46d0e26a9f557b1e5149733b8dd45a0f";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const weaterIcon = document.querySelector(".weather-icon");

console.log(apiUrl);

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weaterIcon.src = "/weather-app/images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weaterIcon.src = "/weather-app/images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weaterIcon.src = "/weather-app/images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weaterIcon.src = "/weather-app/images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weaterIcon.src = "/weather-app/images/mist.png";
    }

    document
      .querySelector(".weather")
      .setAttribute(
        "style",
        "display : block ; animation : animation .6s forwards"
      );

    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  searchBox.value = "";
});
document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
    searchBox.value = "";
  }
});
