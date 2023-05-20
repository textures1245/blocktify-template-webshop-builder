import { defineStore } from "pinia";
import { defineAsyncComponent, markRaw } from "vue";

export type Path = {
  icon?: string;
  title?: string;
  name: string;
  path: string;
  component?: Function;
  children?: {
    path: string;
    component: Function;
  }[];
};

export const useRouterStore = defineStore("useRouterStore", {
  state: () => ({
    viewRoutes: <Path[]>[
      {
        icon: "mdi-home",
        title: "หน้าหลัก",
        name: "overview",
        path: "overview",
        component: markRaw(
          defineAsyncComponent(async () => import("../views/MainView.vue"))
        ),
      },
      {
        icon: "mdi-store",
        title: "ร้านค้า",
        name: "store",
        path: "store",
        component: markRaw(
          defineAsyncComponent(async () => import("../views/StoreView.vue"))
        ),
      },
      {
        icon: "mdi-cash-fast",
        title: "เติมเงิน",
        name: "topup",
        path: "topup",
        component: markRaw(
          defineAsyncComponent(async () => import("../views/TopupView.vue"))
        ),
      },
    ],
  }),
  getters: {
    getViewRoutes: (state) => state.viewRoutes,
  },
  actions: {},
});
