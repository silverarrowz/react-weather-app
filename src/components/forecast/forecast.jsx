import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "./forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const currentWeekDay = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(currentWeekDay, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, currentWeekDay)
  );

  return (
    <>
      <label className="forecast__title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(1, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="forecast__daily-item">
                  <img
                    alt="weather-icon"
                    className="forecast__icon-small"
                    src={`icons/${item.weather.icon}.png`}
                  />
                  <label className="forecast__day">{forecastDays[idx]}</label>
                  <label className="forecast__description">
                    {item.weather.description}
                  </label>
                  <label className="forecast__temperature">
                    {Math.round(item.main.temp_min)}° /{" "}
                    {Math.round(item.main.temp_max)}°
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="forecast__details-grid">
                <div className="forecast__details-grid-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure} hPa</label>
                </div>
                <div className="forecast__details-grid-item">
                  <label>Humidity</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="forecast__details-grid-item">
                  <label>Cloudiness</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="forecast__details-grid-item">
                  <label>Wind speed</label>
                  <label>{item.wind.speed}m/s</label>
                </div>
                <div className="forecast__details-grid-item">
                  <label>Feels like</label>
                  <label>{Math.round(item.main.feels_like)}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
