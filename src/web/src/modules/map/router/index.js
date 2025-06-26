import LeafletMap from "../components/LeafletMap.vue";

export default [
  {
    path: "/map",
    // component: BasicMap,
    // component: () => import("../../../layouts/Default.vue"),
    component: () => import("@/layouts/Default.vue"),
    children: [
      // {
      //   path: "/maps",
      //   name: "Maps",
      //   component: Maps,
      //   meta: { requiresAuth: true },
      // },
      {
        path: "",
        name: "Map",
        component: LeafletMap,
      },
    ],
  },
];
