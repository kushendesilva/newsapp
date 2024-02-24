import { create, ApisauceInstance } from "apisauce";

interface AuthAPI extends ApisauceInstance {}

export const authAPI: AuthAPI = create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});
