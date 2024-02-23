import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { NewsStoreModel } from "./NewsStore";
import { AuthStoreModel } from "./AuthStore";

export const RootStoreModel = types.model("RootStore").props({
  newsStore: types.optional(NewsStoreModel, {}),
  authStore: types.optional(AuthStoreModel, {}),
});

export interface RootStore extends Instance<typeof RootStoreModel> {}

export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
