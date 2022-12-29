import { authGuard } from "@auth0/auth0-vue";

const routes = [
  {
    path: "",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("../views/Dashboard.vue"),
        children: [
          // {
          //   path: "",
          //   component: () => import("./components/someComponent.vue"),
          // },
        ],
      },
      {
        path: "/profile",
        component: () => import("../components/Profile.vue"),
        beforeEnter: authGuard,
        children: [
          // {
          //   path: "",
          //   component: () => import("./components/someComponent.vue"),
          // },
        ],
      },
    ],
  },
];

export default routes;
