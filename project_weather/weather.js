function weatherFunction() {
  let inputField = document.getElementById("location_input").value;
  if (!inputField.trim()) {
    alert("Please enter a city.");
    return;
  }

  const weatherApiKey = "f8a59f6f9b2edb2e3bc206f8a8f29b6a";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputField}&appid=${weatherApiKey}`;
  const fetchWeatherData = async () => {
    let response = await fetch(weatherUrl);
    let data = await response.json();
    console.log(data);
    const weatherDescription = document.getElementById("weather_description");
    if (weatherDescription) {
      weatherDescription.textContent = data.weather[0].description;
    }

    const location = document.getElementById("location");
    if (location) {
      location.textContent = inputField;

      const temperatureElement = document.getElementById("temperature");
      if (temperatureElement) {
        const temperatureCelsius = Math.round(data.main.temp - 273.15);
        temperatureElement.textContent = `${temperatureCelsius}°C`;
      }
    }
  };

  fetchWeatherData();
}
document.querySelector("#search").addEventListener("click", weatherFunction);
