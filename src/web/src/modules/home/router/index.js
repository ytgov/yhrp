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
    ],
  },
];

export default routes;
