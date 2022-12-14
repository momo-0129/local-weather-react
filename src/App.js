import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=507d13237c0c5f1f95276eea0540a187&units=metric`
        )
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false);
          });
      });
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        {!loading && data.weather ? (
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt=""
            id="weather-icon"
          />
        ) : null}
        {loading && <p>Trying to get your location...</p>}

        <div id="location">{data.name}</div>
        <div className="desc">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
        <div className="weather">
          <div className="c">
            {data.main ? <h3>{data.main.temp.toFixed()}°C</h3> : null}
          </div>
            {data.main ?   <div className="circle"></div> : null}
          <div className="f">
            {data.main ? (
              <h3>{((data.main.temp * 9) / 5 + 32).toFixed()}°F</h3>
            ) : null}
          </div>
        </div>
        <div className="info">
          <h3>
            {/* Sunrise:{" "} */}
            <span className="sunrise">
              {data.main ? (
                <h3>Sunrise:
                  {new Date(data.sys.sunrise * 1000).toLocaleDateString()},
                  {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </h3>
              ) : null}
            </span>
          </h3>
          <h3>
            {/* Sunset:{" "} */}
            <span className="sunset">
              {data.main ? (
                <h3>Sunset:
                  {new Date(data.sys.sunset * 1000).toLocaleDateString()},
                  {new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </h3>
              ) : null}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default App;
