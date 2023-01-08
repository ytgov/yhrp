import Maps from "../views/Maps.vue";
import BasicMap from "../components/BasicMap.vue";

export default [
  {
    path: "/maps",
    name: "Maps",
    component: Maps,
    meta: { requiresAuth: true },
  },
  {
    path: "/basic-map",
    name: "Maps basic",
    component: BasicMap,
    meta: { requiresAuth: true },
  },
];
