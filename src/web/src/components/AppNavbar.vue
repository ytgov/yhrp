<template>
  <MobileNavbar v-if="mobile" />
  <DesktopNavbar v-else />
</template>

<script setup>
import { useDisplay } from "vuetify";
import DesktopNavbar from "./DesktopNavbar.vue";
import MobileNavbar from "./MobileNavbar.vue";

const { mobile } = useDisplay();
</script>
