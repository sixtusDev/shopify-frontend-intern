import http from "./httpService";

// API call to fetch mars rovers pictures
export const getMarsRoverPhotos = (date) => {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&page=1&api_key=${process.env.REACT_APP_API_KEY}`;
  return http.get(url);
};
