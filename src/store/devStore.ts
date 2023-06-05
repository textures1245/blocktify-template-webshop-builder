import { defineStore } from "pinia";

export const useDevStore = defineStore("useDevStore", {
  state: () => ({
    isDevMode: true,
  }),
  getters: {},
  actions: {},
});
