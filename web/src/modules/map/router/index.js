import Maps from "../views/Maps.vue";
import BasicMap from "../components/BasicMap.vue";

export default [
  {
    path: "map",
    component: import("@/layouts/Default.vue"),
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
        component: BasicMap,
      },
    ],
  },
];
