<template>
  <v-app-bar color="white" flat height="70" class="border-b-yg_sun">
    <router-link to="/" class="d-flex align-center text-decoration-none ml-4">
      <v-toolbar-title class="font-weight-bold text-h6">
        {{ applicationName }}
      </v-toolbar-title>
    </router-link>

    <v-spacer />

    <v-btn variant="text" size="large" color="primary" icon="mdi-menu">
      <v-icon>mdi-menu</v-icon>
      <NavMenu />
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { applicationName } from "@/config";
import NavMenu from "./NavMenu.vue";
</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
  color: inherit;
}

.border-b-yg_sun {
  border-bottom: 3px solid #f3b228 !important;
}
</style>
