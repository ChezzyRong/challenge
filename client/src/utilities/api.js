import { URL } from "../constants/api";

const API_URL = "http://localhost:5000" + URL;

export const getWordCount = ({ url, sort, order, page }) => {
  return fetch(
    `${API_URL}?url=${url}&sort=${sort}&order=${order}&page=${page}`
  );
};
