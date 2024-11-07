const url ='https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

document.getElementById("buttonWeather").addEventListener('click',getWeather);
$(document).ready(function () {
    getWeather('Pune');
});



async function getWeather() {
    const cityName = $('#city-input').val() || 'Pune';
    console.log(cityName);
    console.log(typeof cityName);
    if (/\d/.test(cityName)) {
        console.error("Invalid ");
        alert("Numbers are not allowed");
        return;
    }
    const fullUrl = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(fullUrl);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert('City not found. Please try again.');
        }
    } 
    catch (error) {
        console.error('Error fetching weather data:', error);
    }
}




function displayWeather(data) {
    $('#city-name').text(`Weather in ${data.name}`);
    $('#date').text(moment().format('MMMM Do YYYY'));
    const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const cityLocalTime = new Date(utcTime + data.timezone * 1000);
    $('#time').text(moment(cityLocalTime).format('h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#minTemp').text(`${data.main.temp_min}°C`);
    $('#forcast').text(`${data.weather[0].main}`);
    $('#maxTemp').text(`${data.main.temp_max}°C`);
    $('#wind-speed').html(` ${data.wind.speed} m/s`);
    $('#humidity').html(` ${data.main.humidity} %`);
    $('#weather-icon').attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    $('#lastShow').attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    $('#weather-info').removeClass('d-none');
    
}













