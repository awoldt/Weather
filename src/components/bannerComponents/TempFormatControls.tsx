import WeatherInterface from "../../interfaces/WeatherDetails";
import { motion } from "framer-motion";

const X = ({
  data,
  iconOpacity,
  updateBanners,
  index,
  update,
}: {
  data: WeatherInterface;
  iconOpacity: number;
  updateBanners: Array<WeatherInterface>;
  index: number;
  update: React.Dispatch<React.SetStateAction<WeatherInterface[]>>;
}) => {
  return (
    <div>
      {data.weatherStats.temp! && data.tempFormat === "F" && (
        <motion.div animate={{ opacity: iconOpacity }}>
          <span style={{ fontSize: "60px" }}>
            {Number(
              (((data.weatherStats.temp - 273.15) * 9) / 5 + 32).toFixed(0)
            )}
            <span style={{ fontSize: "25px", marginLeft: "5px" }}>&#176;F</span>
          </span>

          <div>
            <span style={{ fontSize: "18px" }}>F</span>
            <span
              style={{
                marginLeft: "10px",
                cursor: "pointer",
              }}
              className="text-secondary"
              onClick={() => {
                const obj: WeatherInterface = data; //current banner data
                obj.tempFormat = "C";

                updateBanners.splice(index, 1, obj); //replaces old banner data with new formated temp
                updateBanners = [...updateBanners];
                update(updateBanners); //setState re-render
              }}
            >
              C
            </span>
          </div>
          {data.weatherStats.temp <= 272.039 && (
            <span>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-thermometer-snow"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585A1.5 1.5 0 0 1 5 12.5z" />
                  <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1.293l.646-.647a.5.5 0 0 1 .708.708L9 5.207v1.927l1.669-.963.495-1.85a.5.5 0 1 1 .966.26l-.237.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.884.237a.5.5 0 1 1-.26.966l-1.848-.495L9.5 8l1.669.963 1.849-.495a.5.5 0 1 1 .258.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.237.883a.5.5 0 1 1-.966.258L10.67 9.83 9 8.866v1.927l1.354 1.353a.5.5 0 0 1-.708.708L9 12.207V13.5a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5z" />
                </svg>{" "}
                It is very cold at this location
              </p>
            </span>
          )}
        </motion.div>
      )}
      {data.weatherStats.temp! && data.tempFormat === "C" && (
        <motion.div animate={{ opacity: iconOpacity }}>
          <span style={{ fontSize: "60px" }}>
            {(data.weatherStats.temp - 273.15).toFixed(0)}
            <span style={{ fontSize: "25px", marginLeft: "5px" }}>&#176;C</span>
          </span>

          <div>
            <span
              style={{
                cursor: "pointer",
              }}
              className="text-secondary"
              onClick={() => {
                const obj: WeatherInterface = data;
                obj.tempFormat = "F";
                updateBanners.splice(index, 1, obj);
                updateBanners = [...updateBanners];
                update(updateBanners);
              }}
            >
              F
            </span>
            <span
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              C
            </span>
          </div>

          {data.weatherStats.temp <= 272.039 && (
            <span>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-thermometer-snow"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585A1.5 1.5 0 0 1 5 12.5z" />
                  <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1.293l.646-.647a.5.5 0 0 1 .708.708L9 5.207v1.927l1.669-.963.495-1.85a.5.5 0 1 1 .966.26l-.237.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.884.237a.5.5 0 1 1-.26.966l-1.848-.495L9.5 8l1.669.963 1.849-.495a.5.5 0 1 1 .258.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.237.883a.5.5 0 1 1-.966.258L10.67 9.83 9 8.866v1.927l1.354 1.353a.5.5 0 0 1-.708.708L9 12.207V13.5a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5z" />
                </svg>{" "}
                It is very cold at this location
              </p>
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default X;
