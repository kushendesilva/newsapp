import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";
import { authAPI } from "../utils/api";

export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    isAuthenticated: types.optional(types.boolean, false),
    user: types.optional(types.frozen(), null),
  })
  .actions((store) => ({
    register: flow(function* (email: string, password: string) {
      try {
        const response: any = yield authAPI.post("/register", {
          email: email,
          password: password,
        });

        if (response.status === 200) {
          const loginResponse: any = yield authAPI.post("/login", {
            email: email,
            password: password,
          });
          authAPI.setHeader(
            "Authorization",
            `Bearer ${loginResponse.data.accessToken}`
          );

          const accountResponse: any = yield authAPI.get(`/manage/info`);

          store.user = accountResponse.data.email;
          store.isAuthenticated = true;

          return { error: false, data: accountResponse.data };
        } else {
          const errors = response.data.errors;
          const errorMessages: any[] = [];
          for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
              const errorMessagesForKey = errors[key];
              errorMessagesForKey.forEach((message: any) => {
                errorMessages.push(`${message}`);
              });
            }
          }
          return { error: true, data: errorMessages };
        }
      } catch (error) {
        console.log("Error Registering", error);
        throw error;
      }
    }),
    signIn: flow(function* (email: string, password: string) {
      try {
        const response: any = yield authAPI.post("/login", {
          email: email,
          password: password,
        });
        if (response.status === 200) {
          authAPI.setHeader(
            "Authorization",
            `Bearer ${response.data.accessToken}`
          );

          const accountResponse: any = yield authAPI.get(`/manage/info`);

          store.user = accountResponse.data.email;
          store.isAuthenticated = true;

          return { error: false, data: accountResponse.data };
        } else {
          return { error: true, data: response.data };
        }
      } catch (error) {
        console.log("Error Signing In", error);
        throw error;
      }
    }),
    logout: flow(function* () {
      try {
        store.user = null;
        store.isAuthenticated = false;
      } catch (error) {
        console.log("Error signing out", error);
      }
    }),
  }));

export interface AuthStore extends Instance<typeof AuthStoreModel> {}
export interface AuthStoreSnapshot extends SnapshotOut<typeof AuthStoreModel> {}
