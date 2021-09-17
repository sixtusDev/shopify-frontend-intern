import { baseUrl } from "./url";
import http from "./httpService";

// API call to fetch mars rovers pictures
export const getMarsRoverPhotos = () => http.get(baseUrl);
