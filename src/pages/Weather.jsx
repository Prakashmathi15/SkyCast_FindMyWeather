import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Weather.css";

function Weather() {
  const navigate = useNavigate();
  const city = localStorage.getItem("city");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) {
      navigate("/");
      return;
    }
    const fetchWeather = async () => {
      try {
       const apiKey = '91a1dcf844967b00c27d548af8e7fcda'; 
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setWeather(res.data);
      } catch (err) {
        alert("City not found. Please try again.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city, navigate]);

  const tempFahrenheit = useMemo(() => {
    if (weather) {
      return (weather.main.temp * 9) / 5 + 32;
    }
    return null;
  }, [weather]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="weather-container">
      <h2>Weather in {city}</h2>
      <p>🌡️ Temp: {weather.main.temp}°C / {tempFahrenheit.toFixed(2)}°F</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>💨 Wind: {weather.wind.speed} m/s</p>
      <p>🌥️ Condition: {weather.weather[0].description}</p>
      <button onClick={() => navigate("/")}>Search Again</button>
    </div>
  );
}

export default Weather;
