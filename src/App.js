import "./App.css";
import React, { useState, useEffect } from "react";


function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  
  

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      // console.log(long)
      // console.log(lat)

      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=507d13237c0c5f1f95276eea0540a187`)
      .then(res => res.json())
      .then(data => {
        setData(data)
        // console.log(data);
      });
    }
      fetchData();
    } , [lat,long])
  
  return (
    <div className="App">
      <div className="container">
        {data.weather ?  <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}   alt=""  id="weather-icon"/> : null}

        <div id="location">
          {data.name}</div>
        <div className="desc">
        {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
        <div className="weather">
            <div className="c">
            {data.main ? <h3>{((((data.main.temp)*9)/5)+32).toFixed()}°C</h3> : null}
            </div>
            <div className="circle"></div>
            <div className="f">
            {data.main ? <h3>{data.main.temp.toFixed()}°F</h3> : null}
            </div>
        </div>
        <div className="info">
            <h3>Sunrise: <span className="sunrise">
            {data.main ? <h3>{new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</h3> : null}
              </span></h3>
            <h3>Sunset: <span className="sunset">
            {data.main ? <h3>{new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN')}</h3> : null}
              </span></h3>
        </div>
    </div>
    </div>
  );

}

export default App;
