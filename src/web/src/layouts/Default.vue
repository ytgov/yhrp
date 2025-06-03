<template>
  <AppNavbar />

  <v-main>
    <!-- Provides the application the proper gutter -->
    <!-- fill-height causes the main content to fill the entire page -->
    <!-- <v-container fluid class=""> -->
    <router-view></router-view>
    <!-- </v-container> -->
  </v-main>

  <v-overlay v-model="showOverlay" class="align-center justify-center">
    <div class="text-center">
      <v-progress-circular
        indeterminate
        size="64"
        class="mb-5"
      ></v-progress-circular>
      <h1 class="title">Loading {{ title }}</h1>
    </div>
  </v-overlay>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";
import { applicationName } from "@/config";
import { useNotificationService } from "@/services/notificationService";

export default {
  name: "DefaultLayout",
  components: {
    AppNavbar,
  },

  setup() {
    const { showNotification, show } = useNotificationService();
    return { showNotification, show };
  },

  data() {
    return {
      loadingClass: "d-none",
      showOverlay: true,
    };
  },

  computed: {
    title() {
      return applicationName;
    },
  },

  mounted() {
    this.showOverlay = false;
  },

  methods: {
    blip() {
      this.show({
        text: "Register not implemented yet",
        variant: "primary",
      });
    },
  },
};
</script>
