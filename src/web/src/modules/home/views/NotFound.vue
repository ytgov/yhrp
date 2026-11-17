<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <p class="text-h2 mb-4" aria-hidden="true">404</p>
        <h1 class="text-h4 mb-6">{{ t(translations.notFoundTitle) }}</h1>
        <p class="text-body-1 mb-6">
          {{ t(translations.notFoundText) }}
        </p>
        <v-btn color="primary" to="/" class="mt-4">
          {{ t(translations.goToHomePage) }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLanguage, translations } from "@/composables/useLanguage";

const { t } = useLanguage();
</script>
