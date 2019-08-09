import React from 'react';

import Icon from '../Icon/index';

import { API_KEY, getDateFromDT } from '../utils';

export default class WeatherCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { weather: {} };

    this.fetchWeatherData = this.fetchWeatherData.bind(this);
  }

  componentDidMount() {
    this.fetchWeatherData();
  }

  async fetchWeatherData() {
    const json = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=Kyiv&units=metric&cnt=7&appid=${API_KEY}`);
    
    const data = await json.json();
      this.setState({ weather: data });
  }

  render() {
    const { weather } = this.state;

      if (!weather.list) {
        return null;
      }

    const weatherToday = weather.list[0];

      return (
        <div>
          <div className="todayWeather">
            <div className="dateCity">
              <div className="date">{getDateFromDT(weatherToday.dt, 'MMMM D dddd')}</div>
              <div className="city">{weather.city.name}</div>
            </div>
            <div className="temp">
              <div className="tempCel">{Math.round(weatherToday.temp.day)}°</div>                 
              <div className="tempIcon">
                <Icon size="large" weatherType={weatherToday.weather[0].main.toLowerCase()} />
              </div>
            </div>
          </div>
          <div className="weekWeather"> {
            weather.list.map((day, i) => (
              <div className="weekForecast">
                <div>{getDateFromDT(weather.list[i].dt, 'ddd')}</div>
                  <div>
                    <Icon size="small" weatherType={weather.list[i].weather[0].main.toLowerCase()} />
                  </div>
                  <div className="weekTemp">{Math.round(weather.list[i].temp.day)}°</div>           
              </div>
            ))
          }
          </div>
        </div>
      );
  }
}
