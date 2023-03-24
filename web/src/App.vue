<template>
  <v-app>
    <router-view />
    <notifications />
  </v-app>
</template>

<script>
// p
import Notifications from "@/components/Notifications.vue";

// import { useAuthStore } from "@/stores/AuthStore";
// import { useApiStore } from "@/stores/ApiStore";
export default {
  setup() {
    // The auth0-vue client uses composables to load and manage
    // authentication information.  In components this information is available
    // via this.$auth0. To make the same information available to the Pinia stores
    // we initialize the store with the same information at the root of the app.
    // const auth = useAuthStore();
    // const api = useApiStore();
  },
  name: "App",
  components: {
    Notifications,
  },
  computed: {},
  methods: {},
  async mounted() {
    // await this.initialize();
  },
};
</script>
