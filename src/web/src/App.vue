<template>
  <v-app>
    <router-view />
    <notifications />
  </v-app>
</template>

<script>
import Notifications from "@/components/Notifications.vue";

export default {
  setup() {
    // Setup function kept empty for future use
  },
  name: "App",
  components: {
    Notifications,
  },
  computed: {},
  methods: {},
  async mounted() {
    // Mounted hook kept empty for future use
  },
};
</script>

<style>
.v-application {
  font-family: "Roboto", sans-serif;
}
</style>
