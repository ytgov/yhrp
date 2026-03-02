<template>
  <v-card elevation="2" class="place-card h-100" hover @click="$emit('click')">
    <v-img :src="imageUrl" aspect-ratio="1" cover class="bg-grey-lighten-2">
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular indeterminate color="grey-lighten-1" />
        </div>
      </template>
      <div class="hover-overlay">
        <v-btn color="white" variant="flat">View Place</v-btn>
      </div>
    </v-img>

    <v-card-title class="text-body-1 font-weight-medium">
      {{ title }}
    </v-card-title>

    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
  </v-card>
</template>

<script setup>
defineProps({
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
});

defineEmits(["click"]);
</script>

<style scoped>
.place-card {
  cursor: pointer;
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.place-card:hover .hover-overlay {
  opacity: 1;
}
</style>
