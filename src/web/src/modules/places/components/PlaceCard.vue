<template>
  <v-card elevation="5" class="place-card">
    <div class="hover-overlay">
      <v-btn @click="$emit('click')">View Place</v-btn>
    </div>

    <v-card-title>{{ title }}</v-card-title>

    <div class="image-container">
      <v-img
        :src="imageUrl"
        class="white--text align-end"
        aspect-ratio="1"
        cover
      />
    </div>

    <v-card-actions>
      <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PlaceCard",
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.place-card {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
}

.image-container :deep(.v-img) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  z-index: 1;
}

.place-card:hover .hover-overlay {
  opacity: 1;
}
</style>
