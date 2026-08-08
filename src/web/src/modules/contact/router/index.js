const routes = [
  {
    path: "",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "/contact",
        name: "contact",
        component: () => import("../views/Contact.vue"),
      },
    ],
  },
];

export default routes;
