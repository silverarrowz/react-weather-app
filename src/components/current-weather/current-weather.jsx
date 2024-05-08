import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  return (
    <div className="weather">
      <div className="weather__top">
        <div>
          <p className="weather__city">{data.city}</p>
          <p className="weather__description">
            {data.weather[0].description.charAt(0).toUpperCase() +
              data.weather[0].description.slice(1)}
          </p>
        </div>
        <img
          className="weather__icon"
          src={`icons/${data.weather[0].icon}.png`}
          alt="weather-icon"
        />
      </div>

      <div className="weather__bottom">
        <p className="weather__temperature">{Math.round(data.main.temp)}°C</p>
        <div className="weather__details">
          <div className="weather__parameter-row">
            <span className="weather__parameter-label weather__details-title">
              Details
            </span>
          </div>

          <div className="weather__parameter-row">
            <span className="weather__parameter-label">Feels like</span>
            <span className="weather__parameter-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="weather__parameter-row">
            <span className="weather__parameter-label">Wind</span>
            <span className="weather__parameter-value">
              {data.wind.speed} m/s
            </span>
          </div>
          <div className="weather__parameter-row">
            <span className="weather__parameter-label">Humidity</span>
            <span className="weather__parameter-value">
              {data.main.humidity}%
            </span>
          </div>
          <div className="weather__parameter-row">
            <span className="weather__parameter-label">Pressure</span>
            <span className="weather__parameter-value">
              {data.main.pressure} hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
