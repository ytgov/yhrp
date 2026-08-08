export default [
  {
    path: "/places",
    component: () => import("@/layouts/Default.vue"),
    children: [
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
      },
    ],
  },
];
