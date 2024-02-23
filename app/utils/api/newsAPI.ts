import { create, ApisauceInstance } from "apisauce";

interface NewsAPI extends ApisauceInstance {}

export const newsAPI: NewsAPI = create({
  baseURL: process.env.EXPO_PUBLIC_NEWS_API_URL,
  headers: {
    Accept: "application/json",
  },
});
