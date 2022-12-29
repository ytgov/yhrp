// Components
import App from "./App.vue";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createWebHistory } from "vue-router";
import createRouter from "@/router";

// Plugins
import { registerPlugins } from "@/plugins";

const router = createRouter(createWebHistory());
const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);

registerPlugins(app);

app.mount("#app");
