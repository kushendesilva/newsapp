import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";

export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    isAuthenticated: types.optional(types.boolean, true),
    user: types.optional(types.frozen(), {
      name: "John Doe",
      email: "john@doe.com",
    }),
  })
  .actions((store) => ({
    signIn: flow(function* (user: any) {
      try {
        store.user = user;
        store.isAuthenticated = true;
      } catch (error) {
        console.log("Error signing in", error);
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
