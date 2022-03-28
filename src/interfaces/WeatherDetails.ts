interface weaterDetails {
  cityName: string | null;
  stateName: string | null;
  mainWeather: string | null;
  weatherStats: {
    temp: number | null;
  },
  tempFormat: string | null
}

export default weaterDetails;
