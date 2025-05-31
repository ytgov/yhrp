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
      {
        path: "view/:placeId",
        name: "placeView",
        component: () => import("../views/PlacesForm.vue"),
        props: true,
        // meta: { requiresAuth: true },
      },
    ],
  },
];
