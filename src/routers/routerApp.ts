import {
  RouteRecordRaw,
  createRouter,
  createWebHistory,
  RouterOptions,
  createWebHashHistory,
} from "vue-router";

import { pinia } from "../store/piniaConfig";
import { Path, useRouterStore } from "../routers/routerStore";

const pathStore = useRouterStore(pinia);
const vRoutes = pathStore.$state.viewRoutes;
// const usrRoutes = pathStore.$state.userPaths;

const viewRoutes = {
  name: "application",
  path: "/app",
  component: () => import("../views/AppView.vue"),
  children: vRoutes.map((r) => ({
    path: r.path,
    name: r.name,
    component: () =>
      Promise.resolve(r.component || import("../errors/NotFoundView.vue")),
    meta: { requiresAuth: true },
  })),
};
// children: () =>
//   r.children !== undefined
//     ? r.children.map((childPath) => ({
//         path: childPath.path,
//         component: () =>
//           Promise.resolve(
//             childPath.component || import("../components/NotFoundApp.vue")
//           ),
//       }))
//     : [], // add empty array if no children are present to avoid errors

const customRoutes = [
  {
    name: "ClientManagementLogin",
    path: "/client-management-login",
    component: () => import("../views/ClientLoginView.vue"),
  },
  //- store key generator
  // {
  //   name: "ApiStaffKeyGenerator",
  //   path: "/api-staff-key-generator",
  //   component: () => import("../views/ApiKeyGeneratorView.vue"),
  // },
  {
    name: "PlayerLogin",
    path: "/login",
    component: () => import("../views/PlayerLoginView.vue"),
  },
  {
    name: "application",
    path: "/app",
    component: () => import("../views/AppView.vue"),
    children: [
      {
        name: "overview",
        path: "overview",
        component: () => import("../views/MainView.vue"),
      },
      {
        name: "store",
        path: "store",
        component: () => import("../views/StoreView.vue"),
      },
      {
        name: "topup",
        path: "topup",
        component: () => import("../views/TopupView.vue"),
      },
    ],
  },
];

const routes = [viewRoutes, ...customRoutes];
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.length === 0) {
    return next("/app/overview");
  }
  next();
});

export default router;
