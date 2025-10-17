import axios from "axios";

const IS_PRODUCTION = import.meta.env.PROD === true;

const getBaseUrls = (): { BASE_URL: string } => {
  if (IS_PRODUCTION) {
    const location = window.location;

    if (location.hostname === "localhost") {
      return {
        BASE_URL: "http://localhost:8080",
      };
    }

    return {
      BASE_URL: "https://server.simple-table.ru",
    };
  }

  return {
    BASE_URL: "/api",
  };
};

const { BASE_URL } = getBaseUrls();

export const network = axios.create({
  baseURL: BASE_URL,
});
