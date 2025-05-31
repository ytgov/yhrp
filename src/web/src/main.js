// Components
import App from "./App.vue";

import createRouter from "@/router";
import { createApp } from "vue";
import { createWebHistory } from "vue-router";

// Plugins
import { registerPlugins } from "@/plugins";

const router = createRouter(createWebHistory());

const app = createApp(App);
app.use(router);

registerPlugins(app);

app.mount("#app");
