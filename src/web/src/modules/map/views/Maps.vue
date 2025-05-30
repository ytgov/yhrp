<template>
  <div>
    <h1>Maps</h1>
    The map goes here: Remember to layer in layout...
    <div id="mapHost">
      <advanced-map></advanced-map>
    </div>
  </div>
</template>

<script>
import AdvancedMap from "../components/AdvancedMap.vue";

export default {
  name: "MapsView",
  components: { AdvancedMap },
  data: () => ({
    showAdvanced: true,
  }),
  mounted() {
    this.showAdvanced = true;
    this.$nextTick(() => {
      window.addEventListener("resize", this.adjustMapHeight);
    });
    this.adjustMapHeight();
  },
  methods: {
    adjustMapHeight() {
      let host = document.getElementById("mapHost");
      let offset = host.offsetTop + 95;
      let remainder = window.innerHeight - offset;
      remainder = Math.max(400, remainder);
      host.style.height = remainder + "px";
    },
  },
};
</script>
