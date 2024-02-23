import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";
import { newsAPI } from "../utils/api";

export const NewsStoreModel = types.model("NewsStore").actions(() => ({
  getNews: flow(function* () {
    try {
      const response: any = yield newsAPI.get(
        `/top-headlines?country=us&apiKey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}`
      );
      console.log("Fetching News:", response.status);
      return response.data;
    } catch (error) {
      console.log("Error fetching News", error);
      throw error;
    }
  }),
  searchNews: flow(function* (term: string) {
    try {
      const response: any = yield newsAPI.get(
        `everything?q=${term}&apiKey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}`
      );

      return response.data;
    } catch (error) {
      console.log("Error searching News", error);
      throw error;
    }
  }),
}));

export interface NewsStore extends Instance<typeof NewsStoreModel> {}
export interface NewsStoreSnapshot extends SnapshotOut<typeof NewsStoreModel> {}

// import api from "./client";
// const getNews = () => {
//   return api.get(
//     "/top-headlines?country=in&apiKey=${Your_apikey}"
//   );
// };
// const searchedNews = (str) => {
//   return api.get(`everything?q=${str}&apiKey=${Your_apikey}`);
// };
// export default {
//   getNews,
//   searchedNews,
// };
