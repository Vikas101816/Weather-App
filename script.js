const apiKey = "88c135049e50e6b0f43fd8763d89f36f";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();

    // Extract data
    const cityName = data.name;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const condition = data.weather[0].main;
    const icon = data.weather[0].icon;

    // Weather card template
    const weatherHTML = `
      <div class="weather-card">
        <h2>Weather in ${cityName}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${condition}">
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Condition:</strong> ${condition}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind} m/s</p>
      </div>
    `;

    document.getElementById("weatherResult").innerHTML = weatherHTML;

    // Change background based on condition
    document.body.className = ""; // reset classes
    const mainCondition = condition.toLowerCase();
    if (mainCondition.includes("cloud")) {
      document.body.classList.add("clouds");
    } else if (mainCondition.includes("rain")) {
      document.body.classList.add("rain");
    } else if (mainCondition.includes("snow")) {
      document.body.classList.add("snow");
    } else if (mainCondition.includes("clear")) {
      document.body.classList.add("clear");
    } else {
      document.body.classList.add("sunny"); // fallback
    }

  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `
      <div class="weather-card">
        <p style="color:red;">${error.message}</p>
      </div>
    `;
  }
}
