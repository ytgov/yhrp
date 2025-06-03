<template>
  <v-app-bar
    app
    color="#fff"
    flat
    height="70"
    style="left: 0; border-bottom: 3px #f3b228 solid"
  >
    <div class="pl-5">
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-toolbar-title>
          <span class="font-weight-bold text-h6">{{ title }}</span>
        </v-toolbar-title>
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <v-btn variant="text" size="large" color="primary">
      <v-icon>mdi-menu</v-icon>
      <NavMenu />
    </v-btn>
  </v-app-bar>
</template>

<script>
import { applicationName } from "@/config";
import NavMenu from "./NavMenu.vue";

export default {
  name: "MobileNavbar",
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
</style>
