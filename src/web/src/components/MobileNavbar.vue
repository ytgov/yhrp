<template>
  <v-app-bar color="white" flat height="70" class="border-b-yg_sun">
    <router-link to="/" class="app-title-link">
      <span class="app-title">{{ t(translations.appName) }}</span>
    </router-link>

    <v-spacer />

    <button
      type="button"
      class="yg-link lang-link text-body-2 font-weight-medium px-2"
      :lang="isEnglish ? 'fr' : 'en'"
      :aria-label="isEnglish ? 'Français' : 'English'"
      @click="toggleLanguage"
    >
      {{ isEnglish ? "FR" : "EN" }}
    </button>

    <v-btn
      variant="text"
      color="primary"
      icon="mdi-menu"
      class="ml-1"
      :aria-label="t(translations.menu)"
    >
      <!-- Vuetify ignores the `icon` prop when the button has slot content
           (NavMenu), so the icon must be rendered explicitly here. -->
      <v-icon>mdi-menu</v-icon>
      <NavMenu />
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useLanguage, translations } from "@/composables/useLanguage";
import NavMenu from "./NavMenu.vue";

const { isEnglish, toggleLanguage, t } = useLanguage();
</script>

<style scoped>
.border-b-yg_sun {
  border-bottom: 3px solid #f3b228 !important;
}

.app-title-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  margin-left: 12px;
  min-width: 0;
  flex: 1;
  overflow: hidden;
}

.app-title {
  font-weight: bold;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lang-link {
  min-width: 36px;
  min-height: 36px;
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
