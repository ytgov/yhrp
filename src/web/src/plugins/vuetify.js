/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
// import { VDataTable } from "vuetify/labs/VDataTable";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          // Yukon.ca button colours (WCAG AA): guide.yukon.ca/en/content-and-design/online-design-patterns/button
          primary: "#00616d",
          "primary-darken-1": "#00454e",
          secondary: "#fff",
          // Yukon.ca link colour (active state)
          anchor: "#005a65",
          yg_moss: "#7A9A01",
          yg_blue: "#0097a9",
          yg_zinc: "#24405A",
          yg_twilight: "#512A44",
          yg_lichen: "#DC4405",
          yg_sun: "#F2A900",
          // Yukon.ca footer background ("tiber")
          yg_tiber: "#0B3442",
        },
      },
      dark: {
        colors: {
          yg_moss: "#7A9A01",
          yg_blue: "#0097a9",
          yg_zinc: "#24405A",
          yg_twilight: "#512A44",
          yg_lichen: "#DC4405",
          yg_sun: "#F2A900",
        },
      },
    },
  },
});
