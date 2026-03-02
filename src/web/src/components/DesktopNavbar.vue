<template>
  <v-app-bar color="white" flat height="70" class="border-b-yg_sun">
    <img src="/yukon.svg" class="ml-8 mt-n2" height="44" alt="Yukon Logo" />

    <router-link to="/" class="d-flex align-center text-decoration-none ml-10">
      <v-toolbar-title class="font-weight-bold text-h5">
        {{ t(translations.appName) }}
      </v-toolbar-title>
    </router-link>

    <v-spacer />

    <div class="d-flex align-center">
      <v-btn
        variant="text"
        class="text-subtitle-1 font-weight-medium"
        @click="toggleLanguage"
      >
        {{ isEnglish ? "Français" : "English" }}
      </v-btn>
      <v-divider class="mx-2" vertical inset />

      <v-btn variant="text" size="large" color="primary">
        <v-icon size="30">mdi-menu</v-icon>
        <NavMenu />
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup>
import { useLanguage, translations } from "@/composables/useLanguage";
import NavMenu from "./NavMenu.vue";

const { isEnglish, toggleLanguage, t } = useLanguage();
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
