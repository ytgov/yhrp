import LeafletMap from "../components/LeafletMap.vue";

export default [
  {
    path: "/map",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "",
        name: "Map",
        component: LeafletMap,
      },
    ],
  },
];
