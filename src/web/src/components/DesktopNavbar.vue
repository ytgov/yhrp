<template>
  <v-app-bar
    app
    color="#fff"
    flat
    height="70"
    style="left: 0; border-bottom: 3px #f3b228 solid"
  >
    <div>
      <img src="/yukon.svg" class="logo" height="44" />
    </div>
    <div class="pl-10">
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-toolbar-title>
          <span class="font-weight-bold text-h5">{{ title }}</span>
        </v-toolbar-title>
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <div class="d-flex align-center">
      <span class="text-subtitle-1 font-weight-medium">Français</span>
      <v-divider class="mr-5" vertical inset></v-divider>

      <v-btn variant="text" size="large" color="primary">
        <v-icon size="30">mdi-menu</v-icon>
        <NavMenu />
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { applicationName } from "@/config";
import NavMenu from "./NavMenu.vue";

export default {
  name: "DesktopNavbar",
  components: {
    NavMenu,
  },
  computed: {
    title() {
      return applicationName;
    },
  },
};
</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
  color: inherit;
}

.logo {
  margin: -8px 0 0 30px;
}
</style>
