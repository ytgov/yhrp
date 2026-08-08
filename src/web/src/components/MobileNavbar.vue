<template>
  <v-app-bar color="white" flat height="70" class="border-b-yg_sun">
    <router-link to="/" class="app-title-link">
      <span class="app-title">{{ t(translations.appName) }}</span>
    </router-link>

    <v-spacer />

    <v-btn
      variant="tonal"
      size="x-small"
      color="primary"
      class="lang-btn"
      @click="toggleLanguage"
    >
      {{ isEnglish ? "FR" : "EN" }}
    </v-btn>

    <v-btn variant="text" color="primary" icon="mdi-menu" class="ml-1">
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

.lang-btn {
  min-width: 36px !important;
  flex-shrink: 0;
}
</style>
