<template>
  <AppNavbar />

  <v-main>
    <router-view />
  </v-main>

  <v-overlay v-model="showOverlay" class="align-center justify-center">
    <div class="text-center">
      <v-progress-circular indeterminate size="64" class="mb-5" />
      <h1 class="text-h5">Loading {{ applicationName }}</h1>
    </div>
  </v-overlay>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AppNavbar from "@/components/AppNavbar.vue";
import { applicationName } from "@/config";

const showOverlay = ref(true);

onMounted(() => {
  showOverlay.value = false;
});
</script>
