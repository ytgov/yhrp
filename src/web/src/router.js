import homeRoutes from "@/modules/home/router";
import mapRoutes from "@/modules/map/router";
import placesRoutes from "@/modules/places/router";
import { createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/Blank.vue"),
    children: [...homeRoutes, ...mapRoutes, ...placesRoutes],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/modules/home/views/NotFound.vue"),
  },
];

export default function (history) {
  return createRouter({
    history,
    routes,
  });
}
