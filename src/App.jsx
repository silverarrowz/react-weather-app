import "./App.css";
import { useState } from "react";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        console.log(weatherResponse);
        console.log(forecastResponse);

        const dailyForecasts = {};

        forecastResponse.list.forEach((forecast) => {
          const date = forecast.dt_txt.split(" ")[0];
          if (!dailyForecasts[date]) {
            dailyForecasts[date] = {
              main: { ...forecast.main },
              weather: { ...forecast.weather[0] },
              clouds: { ...forecast.clouds },
              wind: { ...forecast.wind },
            };
          } else {
            dailyForecasts[date].main.temp_min = Math.min(
              dailyForecasts[date].main.temp_min,
              forecast.main.temp_min
            );
            dailyForecasts[date].main.temp_max = Math.max(
              dailyForecasts[date].main.temp_max,
              forecast.main.temp_max
            );
          }
        });

        const dailyForecastsArray = Object.keys(dailyForecasts).map((date) => ({
          date: date,
          ...dailyForecasts[date],
        }));

        console.log(dailyForecastsArray);

        setForecast({ city: searchData.labelShort, list: dailyForecastsArray });
        console.log(forecast);
      })
      .then(console.log(forecast))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
