<template>
  <v-menu activator="parent">
    <v-list>
      <v-list-item to="/" prepend-icon="mdi-home" :title="t(translations.home)" />
      <v-list-item to="/map" prepend-icon="mdi-map-outline" :title="t(translations.map)" />
      <v-list-item to="/places" prepend-icon="mdi-information-outline" :title="t(translations.historicPlaces)" />
      <v-divider />
      <v-list-item prepend-icon="mdi-email" :title="t(translations.contactUs)" />
    </v-list>
  </v-menu>
</template>

<script setup>
import { useLanguage, translations } from "@/composables/useLanguage";

const { t } = useLanguage();
</script>
