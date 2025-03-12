let input = document.querySelector("#search-input");
let title = document.querySelector("#city-title");
let date = document.querySelector("#date");
let btn = document.querySelector("#weather-btn");
let imgDiv = document.querySelector(".img-div");
let temp1 = document.querySelector(".temp1");
let temp2 = document.querySelector(".temp2");
let temp3 = document.querySelector(".temp3");
let feel = document.querySelector(".feel");
let humidity = document.querySelector(".humidity");
let speed = document.querySelector(".wind");
let pressure = document.querySelector(".pressure");

let getCountry = (countryCode) => {
    const regionNamesInEnglish = new Intl.DisplayNames([countryCode], { type: 'region' }).of(countryCode);
    return regionNamesInEnglish;
}

let getDate = (timestamp) => {
    let todayDate = new Date(timestamp * 1000);
    let options = {
        weekday: "long",
        year: "numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
    };
    let formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(todayDate);
}

async function getWeather(city) {
    try {
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c84b1c5e4b4865688914d14cd9ffe11e&units=metric`;
        let response = await fetch(api);
        let data = await response.json();
        let { name, dt, weather, wind, sys, main } = data;
        title.innerText = `${name}, ${getCountry(sys.country)}`;
        date.innerText = `${getDate(dt)}`;
        btn.innerText = weather[0].main;
        imgDiv.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="" width="100px">`;
        temp1.innerHTML = `${main.temp.toFixed(1)}&#176;C`;
        temp2.innerHTML = `Min: ${main.temp_min.toFixed(1)}&#176;C`;
        temp3.innerHTML = `Max: ${main.temp_max.toFixed(1)}&#176;C`;
        feel.innerHTML = `${main.feels_like.toFixed(1)}&#176;C`;
        humidity.innerHTML = `${main.humidity}%`;
        speed.innerHTML = `${wind.speed.toFixed(1)} m/s`;
        pressure.innerHTML = `${main.pressure} hPa`;
    } catch (err) {
        console.log(err);
    }
}

getWeather("Ahmedabad");

input.addEventListener("change", () => {
    let city = input.value;
    getWeather(city);
    input.value = "";
});
