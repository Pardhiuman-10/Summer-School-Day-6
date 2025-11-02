document.addEventListener("DOMContentLoaded", () => {
  const GetWeather = document.getElementById('getWeather');
  GetWeather.addEventListener("click", displayWeather);
});

async function displayWeather() {
  const cityElement = document.getElementById('city');
  const tempElement = document.getElementById('temp');
  const conditionElement = document.getElementById('condition');
  const errorElement = document.getElementById('error');

  errorElement.textContent = "Loading...";

  navigator.geolocation.getCurrentPosition(
    async position => {
      const { latitude, longitude } = position.coords;
      const apiKey = "1a3979cbaa3b4d4ae61714c375a3eac8"; // Replace if needed
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

      console.log("Requesting:", url);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Weather fetch failed");

        const data = await res.json();
        console.log("API Response:", data);

        cityElement.textContent = data.name;
        tempElement.textContent = `${data.main.temp} °C`;
        conditionElement.textContent = data.weather[0].description;
        errorElement.textContent = "";
      } catch (err) {
        console.error("Error fetching weather:", err);
        errorElement.textContent = "Failed to fetch weather.";
      }
    },
    error => {
      errorElement.textContent = "Location permission denied.";
      console.error("Location Error:", error);
    }
  );
}
