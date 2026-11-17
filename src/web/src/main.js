// Components
import App from "./App.vue";

import createRouter from "@/router";
import { createApp } from "vue";
import { createWebHistory } from "vue-router";

// Plugins
import { registerPlugins } from "@/plugins";

// Global styles (imported after Vuetify so they take precedence)
import "@/styles/global.css";

const router = createRouter(createWebHistory());

const app = createApp(App);
app.use(router);

registerPlugins(app);

app.mount("#app");
