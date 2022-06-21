const searchbar = document.getElementById('searchbar');
var city = "jammu";
const creditBtn = document.getElementById('credit-icon');
const creditImg = document.getElementById('credit-image');
const dropdown = document.getElementById('dropdown');
var dropdownOpen = false;

const modeIcon = document.getElementById("mode-icon");
var darkMode = false;

window.onload = document.getElementById('onload').style.display='block'

creditBtn.addEventListener('click', function(){
    openCredit();
});

modeIcon.addEventListener("click", function() {
    modeChange();
});

function modeChange() {
    if (darkMode === false) {
        document.body.style = "-webkit-filter: invert(100%); filter: invert(100%); background: #000; colour: #fff";
        darkMode = true;
        modeIcon.src = "images/dark-mode.png";
        modeIcon.title = "Switch to Light Mode";
        modeIcon.style = "height: 76px; margin-top: 4px; margin-left: -1px;";
    } else {
         document.body.style = "-webkit-filter: invert(0%); filter: invert(0%); background: #fff; colour: #000";
         darkMode = false;
         modeIcon.src = "images/light-mode.png";
         modeIcon.title = "Switch to Dark Mode";
         modeIcon.style = "height: 80px; margin-top: 0px; margin-left: 0px;";
    }
}

searchbar.addEventListener('keypress', function(e){
    if (e.key === 'Enter') {
        city = searchbar.value;
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=24cfd0c654d9e4ef10dadcca722c4613";
        fetchWeather(apiUrl);
    }
});

function openCredit(){
    if (dropdownOpen) {
        dropdown.style.display = 'none';
        dropdownOpen = false;
        creditImg.src = 'images/icon-menu.svg';
    } else {
        dropdown.style.display = 'block';
        dropdownOpen = true;
        creditImg.src = 'images/icon-close-menu.svg';
    }
}


function fetchWeather(apiUrl){
    fetch(apiUrl).then((response) => response.json()).then((data) => displayWeather(data));
}

function displayWeather(data){
    try {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,description,temp,humidity,speed);
        document.getElementById("temperature").textContent = parseInt(temp)+"°C";
        document.getElementById("city").textContent = name;
        document.getElementById("humidity").textContent = humidity+"%";
        document.getElementById("wind").textContent = speed+" km/h";
        document.getElementById("desc").textContent = description;
        searchbar.value="";
        //icons
    if (icon === "11d") {
        document.getElementById("weather-icon").src = "images/weather-conditions/storm.gif";
    } else if (icon === "09d") {
        document.getElementById("weather-icon").src = "images/weather-conditions/drizzle.gif";
    } else if (icon === "10d") {
        document.getElementById("weather-icon").src = "images/weather-conditions/rain.gif";
    } else if (icon === "50d") {
        document.getElementById("weather-icon").src = "images/weather-conditions/foggy.gif";
    } else if (icon === "01d") {
        document.getElementById("weather-icon").src = "images/weather-conditions/cloudy.gif";
    } else if (icon === "01n") {
        document.getElementById("weather-icon").src = "images/weather-conditions/cloudy-night.gif";
    } else if (icon === "13d") {
        document.getElementById("weather-icon").src = "images/weather-conditions/snow.gif";
    } else if (icon === "02d" || icon === "02n" || icon === "03n" || icon === "03d" || icon === "04d" || icon === "04n" ) {
        document.getElementById("weather-icon").src = "images/weather-conditions/clouds.gif";
    }
    document.getElementById('onload').style.display = 'none';
    }
    catch(error) {
        document.getElementById('onload').style.display = 'block';
        var error_place = searchbar.value;
        document.getElementById('splash-text').innerHTML = 'We could not find "'+error_place+'", try again with another place.';
    }
}