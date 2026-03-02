<template>
  <AppNavbar />

  <v-main>
    <router-view />
  </v-main>

  <v-overlay v-model="showOverlay" class="align-center justify-center">
    <div class="text-center">
      <v-progress-circular indeterminate size="64" class="mb-5" />
      <h1 class="text-h5">{{ t(translations.loading) }}</h1>
    </div>
  </v-overlay>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useLanguage, translations } from "@/composables/useLanguage";
import AppNavbar from "@/components/AppNavbar.vue";

const { t } = useLanguage();

const showOverlay = ref(true);

onMounted(() => {
  showOverlay.value = false;
});
</script>
