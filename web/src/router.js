import { createRouter } from "vue-router";
import homeRoutes from "@/modules/home/router";
import mapRoutes from "@/modules/map/router";
import placesRoutes from "@/modules/places/router";

// To protect a route, import import { authGuard } from "@auth0/auth0-vue";
// and then add the following to the route object:
// beforeEnter: authGuard,
// the auth0 handles the rest like magic

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/Blank.vue"),
    children: [
      ...homeRoutes,
      ...mapRoutes,
      ...placesRoutes,
      // {
      //   path: "dashboard",
      //   component: () => import("@/components/HelloWorld.vue"),
      // },
    ],
  },
];

export default function (history) {
  return createRouter({
    history,
    routes,
  });
}
