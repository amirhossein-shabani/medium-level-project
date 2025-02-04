let userInput = document.querySelector("#user-input");
const wR_container = document.querySelector(".weather-result-container");
const btn = document.querySelector(".btn");
const backgroundP = document.querySelector(".background-picture");
console.log(backgroundP);
const h1Element = document.querySelector('h1');
const h3Element = document.querySelectorAll('h3');

btn.addEventListener("click", async () => {
  let cityName = userInput.value.trim();
  console.log(cityName);
  userInput.value = "";

  //Detect if input contains Persian chracters
  const isPersain = /[\u0600-\u06FF]/.test(cityName);

  const langParam = isPersain ? "fa" : "en";

  const apiKey = "706f6cfb0b4a2040219bf22b434576eb";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=${langParam}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("weather data ", data);

    const weatherC = data.weather[0].main;
    console.log(weatherC);

    background(weatherC )
    
    processWeatherData(data, isPersain);
  } catch (error) {
    console.error("somthing dosn't work", error);
  }
});

function processWeatherData(weatherData, isPersain) {
  function returnP(weatherData) {
    if (weatherData.sys.country === "IR") {
      return isPersain ? "ایران" : "Iran";
    } else {
      return weatherData.sys.country;
    }
  }

  wR_container.innerHTML = `
  <div class="left-sec">
    <p class="country">country sys : </p>
    <p class="city-name"> City Name : <p>
    <p class="date"> Date : </P>
    <p class="weekday"> week day : </P>
    <p class="sunrise"> sunrise : </P>
    <p class="sunset"> sunset : </P>
    <p class="temp"> Temperature : </P>
    <p class="temp temp-min"> min-temp : </P>
    <p class="temp temp-max"> max-temp : </P>
    <p class="w-c"> W conditions : </P>
    <p class="w-d"> description : </P>
  </div>
  <div class="right-sec">
    <p> ${returnP(weatherData)}</p>
    <p> ${weatherData.name}</P>
    <p class="correct-format"> ${formatDate(weatherData.dt, isPersain)} </p>
    <p> ${formatDateD(weatherData.dt, isPersain)}
    <p class="correct-format"> ${formatTime(weatherData.sys.sunrise, isPersain)}
    <p class="correct-format"> ${formatTime(weatherData.sys.sunset, isPersain)}
    <p> ${weatherData.main.temp} °C </p>
    <p> ${weatherData.main.temp_min} °C </p>
    <p> ${weatherData.main.temp_max} °C </p>
    <p class="w-r"> ${weatherData.weather[0].main}</p>
    <p class="des"> ${weatherData.weather[0].description}</p>
    
  </div>
  `;
}

function formatDate(timestamp, isPersain) {
  const date = new Date(timestamp * 1000); //Convert seconds to milliseconds
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return date.toLocaleDateString(isPersain ? "fa-IR" : "en-US", options);
}
function formatDateD(timestamp, isPersain) {
  const date = new Date(timestamp * 1000);
  const option = { weekday: "long" };
  return date.toLocaleDateString(isPersain ? "fa-IR" : "en-US", option);
}

function formatTime(timestamp, isPersain) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString(isPersain ? "fa-IR" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}



function background(weatherC ){
  if (weatherC === "Clear") {
    backgroundP.setAttribute(
      "style",
      "background : url(/weather-app/image/clear-weather.jpg) no-repeat center / cover;"
    );
    h1Element.setAttribute('style' , "color : black")
    h3Element.forEach(h3 => h3.setAttribute('style' , "color : black"))
  }else if(weatherC === "Clouds"){
    backgroundP.setAttribute(
      "style",
      "background : url(/weather-app/image/clouds-weather.jpg) no-repeat center / cover;"
    );
    h1Element.setAttribute('style' , "color : #444444")
    h3Element.forEach(h3 => h3.setAttribute('style' , "color : #474242"))
  }else if(weatherC === "Fog"){
    backgroundP.setAttribute(
      "style",
      "background : url(/weather-app/image/fog-weather.jpg) no-repeat center / cover;"
    );
    h1Element.setAttribute('style' , "color : #444444")
    h3Element.forEach(h3 => h3.setAttribute('style' , "color : #474242"))
  }else if(weatherC === "Haze"){
    backgroundP.setAttribute(
      "style",
      "background : url(/weather-app/image/haze.jpg) no-repeat center / cover;"
    );
    h1Element.setAttribute('style' , "color : #444444")
    h3Element.forEach(h3 => h3.setAttribute('style' , "color : #474242"))
  }
}


function scrollR(){

const scrollRevealOption ={
  distance : "100px"  ,
  duration : 1000 , 
  origin : 'left' ,
}

ScrollReveal().reveal(".nav-header" , {
 ...scrollRevealOption  ,
 distance : '10%' ,
})
ScrollReveal().reveal("h1" , {
  ...scrollRevealOption  ,
  distance : "20%",
})
ScrollReveal().reveal(".h-text h3" , {
  ...scrollRevealOption  ,
  distance : "30%",
})
ScrollReveal().reveal(".sec-1", {
  ...scrollRevealOption  ,
  distance : "50%",
  duration : 1200 ,
})
ScrollReveal().reveal(".weather-result-container", {
  ...scrollRevealOption  ,
  distance : "50%",
  duration : 1300 ,
})

}

scrollR();