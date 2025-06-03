<template>
  <component :is="currentNavbar" />
</template>

<script>
import { applicationName } from "@/config";
import MobileNavbar from "./MobileNavbar.vue";

export default {
  name: "AppNavbar",
  components: {
    MobileNavbar,
  },
  data() {
    return {
      isMobile: false,
    };
  },
  computed: {
    title() {
      return applicationName;
    },
    currentNavbar() {
      return this.isMobile ? "MobileNavbar" : "DesktopNavbar";
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth < 960;
    },
  },
};
</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
  color: inherit;
}

.logo {
  margin: -8px 0 0 30px;
}

@media (min-width: 960px) {
  .logo {
    margin-right: 24px;
  }
}

@media (max-width: 959px) {
  .logo {
    margin-right: 0;
  }
}
</style>
