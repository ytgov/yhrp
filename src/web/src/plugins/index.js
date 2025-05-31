/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

import BaseComponents from "./baseComponents";
import vuetify from "./vuetify";
import { loadFonts } from "./webfontloader";

export function registerPlugins(app) {
  loadFonts();
  BaseComponents.register(app);
  app.use(vuetify);
}
