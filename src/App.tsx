import "./App.css";
import { Container } from "react-bootstrap";
import WeatherBanner from "./components/WeatherBanner";
import Search from "./components/SearchBar";
import { useState, useEffect } from "react";
import weatherInterface from "./interfaces/WeatherDetails";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  //weather details are null on initial render
  //will populate with weather data once user has done search
  //default temp format returned from API is KELVIN
  const [weatherDetails, setWeatherDetails] = useState<weatherInterface[]>([]);

  const [weatherIconOpacity, setWeatherIconOpacity] = useState<number>(0);
  const [citiesAdded, setCitiesAdded] = useState<string[]>(["Charlotte"]);

  async function loadDefaultBanner() {
    try {
      const x = await axios.get(
        "https://api.openweathermap.org/geo/1.0/direct?q=charlotte&limit=1&appid=" +
          process.env.REACT_APP_API_KEY
      );

      const y = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          x.data[0].lat +
          "&lon=" +
          x.data[0].lon +
          "&appid=" +
          process.env.REACT_APP_API_KEY
      );

      const data: weatherInterface = {
        cityName: y.data.name,
        stateName: x.data[0].state,
        mainWeather: y.data.weather[0].main,
        weatherStats: {
          temp: y.data.main.temp,
        },
        tempFormat: "F",
      };
      const obj = [...weatherDetails];
      obj.push(data);
      setWeatherDetails(obj);
      setWeatherIconOpacity(1);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadDefaultBanner();
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>React Weather App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <Container>
        {weatherDetails.map((banner, index) => {
          return (
            <div style={{ padding: "25px" }}>
              <WeatherBanner
                key={index}
                data={banner}
                iconOpacity={weatherIconOpacity}
                allWeather={weatherDetails}
                bannerIndex={index}
                changeWeather={setWeatherDetails}
              />
            </div>
          );
        })}

        <hr></hr>
        {citiesAdded.length == 1 && (
          <p>
            Showing data for <code>{citiesAdded[0]}</code>
          </p>
        )}
        {citiesAdded.length > 1 && (
          <p>
            Showing data for{" "}
            {citiesAdded.map((x, index) => {
              if (index == citiesAdded.length - 1) {
                return <code>and {x} </code>;
              } else {
                return <code>{x}, </code>;
              }
            })}
          </p>
        )}
        <Search
          setW={setWeatherDetails}
          setIconOpacity={setWeatherIconOpacity}
          w={weatherDetails}
          listOfCities={citiesAdded}
          addCity={setCitiesAdded}
        />
      </Container>
      <div
        className="text-center"
        style={{ marginBottom: "50px", marginTop: "50px" }}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-brush"
            viewBox="0 0 16 16"
          >
            <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z" />
          </svg>{" "}
          Made by{" "}
          <a
            href="https://awoldt.com/"
            rel="noreferrer"
            target="_blank"
            style={{ textDecoration: "none", fontFamily: "Roboto" }}
          >
            Awoldt
          </a>
        </span>
      </div>
    </HelmetProvider>
  );
}

export default App;
