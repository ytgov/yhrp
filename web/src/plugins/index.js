/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

import { loadFonts } from "./webfontloader";
import BaseComponents from "./baseComponents";
import { Auth0Plugin } from "./auth";
import vuetify from "./vuetify";

export function registerPlugins(app) {
  loadFonts();
  BaseComponents.register(app);
  app.use(vuetify);
  app.use(Auth0Plugin);
}
