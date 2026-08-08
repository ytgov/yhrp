/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

import BaseComponents from "./baseComponents";
import vuetify from "./vuetify";

export function registerPlugins(app) {
  BaseComponents.register(app);
  app.use(vuetify);
}
