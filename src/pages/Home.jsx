import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (city.trim() === "") {
      alert("Please enter a city name");
      return;
    }
    localStorage.setItem("city", city);
    navigate("/weather");
  }, [city, navigate]);

  return (
    <div className="home-container" align="center">
      <h1>SkyCast 🌤️</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>
    </div>
  );
}

export default Home;
