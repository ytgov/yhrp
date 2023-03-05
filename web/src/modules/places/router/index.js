export default [
  {
    path: "/places",

    component: () => import("@/layouts/Default.vue"),
    // component: Default,
    children: [
      // {
      //   path: "/maps",
      //   name: "Maps",
      //   component: Maps,
      //   meta: { requiresAuth: true },
      // },
      {
        path: "",
        name: "Places",
        component: () => import("../views/Places.vue"),
      },
    ],
  },
];
