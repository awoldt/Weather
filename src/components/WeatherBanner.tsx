import { useRef, useEffect } from "react";
import WeatherDetails from "../interfaces/WeatherDetails";
import { Row, Col } from "react-bootstrap";
import WeatherIcon from "./bannerComponents/WeatherIcon";
import { motion } from "framer-motion";
import TempFormatControls from "./bannerComponents/TempFormatControls";
import weaterDetails from "../interfaces/WeatherDetails";

const X = ({
  data,
  iconOpacity,
  allWeather,
  bannerIndex,
  changeWeather,
}: {
  data: WeatherDetails;
  iconOpacity: number;
  allWeather: Array<weaterDetails>;
  bannerIndex: number;
  changeWeather: React.Dispatch<React.SetStateAction<WeatherDetails[]>>;
}) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const cityH1TagRef = useRef<HTMLHeadingElement>(null);

  function getWindowWidth() {
    const w = window.innerWidth;
    if (w <= 768) {
      if (cityH1TagRef.current!) {
        cityH1TagRef.current.style.overflowWrap = "break-word";
        cityH1TagRef.current.style.fontSize = "40px";
      }
    } else {
      if (cityH1TagRef.current!) {
        cityH1TagRef.current.style.overflowWrap = "inherit";
        cityH1TagRef.current.style.fontSize = "75px";
      }
    }
  }

  window.onresize = getWindowWidth;

  function getBannerColor(weather: string) {
    switch (weather.toLowerCase()) {
      case "clouds":
        if (bannerRef.current !== null) {
          bannerRef.current.style.backgroundImage =
            "linear-gradient(0deg, lightgrey, grey)";
        }
        break;

      case "rain":
        if (bannerRef.current !== null) {
          bannerRef.current.style.backgroundImage =
            "linear-gradient(0deg, grey, black)";
        }
        break;

      case "mist":
        if (bannerRef.current !== null) {
          bannerRef.current.style.backgroundColor = "#E3F4FE";
        }
        break;

      case "clear":
        if (bannerRef.current !== null) {
          bannerRef.current.style.backgroundImage =
            "linear-gradient(0deg, rgb(28, 156, 246), blue)";
        }
        break;

      case "drizzle":
        if (bannerRef.current !== null) {
          bannerRef.current.style.backgroundColor = "#dee1e3 ";
        }
        break;

      case "snow":
        if (bannerRef.current !== null) {
          bannerRef.current.style.backgroundImage =
            "linear-gradient(0deg, white, grey)";
        }
        break;

      case "thunderstorm":
        if (bannerRef.current !== null) {
          bannerRef.current.style.backgroundImage =
            "linear-gradient(0deg, darkgrey, darkgrey)";
        }
        break;

      default:
        if (bannerRef.current !== null) {
          bannerRef.current.style.backgroundColor = "yellow";
        }
        break;
    }
  }

  useEffect(() => {
    if (data.mainWeather !== null) {
      getBannerColor(data.mainWeather);
    }
  }, [data]);

  return (
    <Row
      style={{
        padding: "25px",
        borderRadius: "10px",
        marginTop: "25px",
      }}
      ref={bannerRef}
    >
      {/* -- WEATHER ICON -- */}
      <Col lg={2}>
        <motion.div animate={{ opacity: iconOpacity }}>
          {data.mainWeather! && (
            <WeatherIcon w={data.mainWeather} weather={data.mainWeather} />
          )}
        </motion.div>
      </Col>
      {/* ------------------ */}

      <Col lg={1}></Col>

      <Col lg={3} className="mt-4">
        {/* md screen */}
        {data.cityName! && window.innerWidth <= 768 && (
          <motion.div animate={{ opacity: iconOpacity }}>
            {data.mainWeather === "Mist" && (
              <h1
                style={{ fontSize: "40px", color: "black" }}
                id="city_title"
                ref={cityH1TagRef}
              >
                {data.cityName}
              </h1>
            )}
            {data.mainWeather !== "Mist" && (
              <h1
                style={{ fontSize: "40px", color: "white" }}
                id="city_title"
                ref={cityH1TagRef}
              >
                {data.cityName}
              </h1>
            )}
          </motion.div>
        )}
        {/* lg and above creen */}
        {data.cityName! && window.innerWidth > 769 && (
          <motion.div animate={{ opacity: iconOpacity }}>
            {data.mainWeather === "Mist" && (
              <h1
                style={{ fontSize: "75px", color: "black" }}
                id="city_title"
                ref={cityH1TagRef}
              >
                {data.cityName}
              </h1>
            )}
            {data.mainWeather !== "Mist" && (
              <h1
                style={{ fontSize: "75px", color: "white" }}
                id="city_title"
                ref={cityH1TagRef}
              >
                {data.cityName}
              </h1>
            )}
          </motion.div>
        )}
        {data.stateName! && (
          <motion.div
            animate={{ opacity: iconOpacity }}
            style={{ marginBottom: "15px" }}
          >
            <span style={{ fontFamily: "Roboto-Light", fontWeight: "bold" }}>
              {data.stateName}
            </span>
          </motion.div>
        )}

        <TempFormatControls
          data={data}
          iconOpacity={iconOpacity}
          updateBanners={allWeather}
          index={bannerIndex}
          update={changeWeather}
        />
      </Col>
      <Col lg={6}></Col>
    </Row>
  );
};

export default X;
