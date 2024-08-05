import React, { useEffect, useState } from "react";
import Search from "../Search/Search";

function Weather() {
  const [search, setsearch] = useState("");
  const [loading, setloading] = useState(false);
  const [weatherData, setweatherData] = useState(null);
  const [celsius, setCelsius] = useState("");
  const [showCelsius, setshowCelsius] = useState(false);

  async function fetchWeatherData(param) {
    setloading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=60136aa016fae96231b6f844aa131a23`
      );

      const data = await response.json();
      if (data) {
        setweatherData(data);
        setloading(false);
        console.log(weatherData);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  }

  function handleSearch() {
    fetchWeatherData(search);
    setshowCelsius(false)
  }

  useEffect(() => {
    fetchWeatherData("patna");
  }, []);

  function getCurrentDate() {
    return new Date().toLocaleString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function handleCelciusConversion(kelvinTemp) {
    const celsius = (kelvinTemp - 273.15).toFixed(1);
    setCelsius(celsius);
    setshowCelsius(true);
    return celsius;
  }
  function handleRemoveCelsius() {
    setCelsius("");
    setshowCelsius(false);
  }
  return (
    <div>
      <Search
        search={search}
        setSearch={setsearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div>Loading The Data Please Wait...!!!</div>
      ) : (
        <div>
          <div className="text-xl font-medium m-1 p-1">
            <h2>
              {weatherData?.name},<span>{weatherData?.sys?.country}</span>{" "}
            </h2>
          </div>
          <div
            className="text-xl font-medium italic m-1 p-1
          "
          >
            <span>{getCurrentDate()}</span>
          </div>
          <div>
            <div>
              {showCelsius ? (
                <p className="text-5xl font-bold p-1">{celsius}</p>
              ) : (
                <p className="text-5xl font-bold p-1">
                  {weatherData?.main?.temp}
                </p>
              )}
            </div>
            <span>
              {showCelsius ? (
                <button
                  onClick={() => handleRemoveCelsius()}
                  className="bg-slate-700 text-white p-2 rounded-lg m-1"
                >
                  Convert to Kelvin
                </button>
              ) : (
                <button
                  onClick={() => handleCelciusConversion(weatherData.main.temp)}
                  className="bg-slate-700 text-white p-2 rounded-lg m-1"
                >
                  Convert To celsius
                </button>
              )}
            </span>

            <p className="text-xl font-normal m-1 italic">
              {weatherData && weatherData.weather && weatherData.weather[0]
                ? weatherData.weather[0].description
                : ""}
            </p>
          </div>
          <div className="flex gap-20 justify-center items-center mt-8">
            <div>
              <p className="text-xl font-medium ">
                <span>Wind Speed</span> <div>{weatherData?.wind?.speed}</div>{" "}
              </p>
            </div>
            <div>
              <p className="text-xl font-medium">
                {" "}
                <span>Humidity</span> <div>{weatherData?.main?.humidity}%</div>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
