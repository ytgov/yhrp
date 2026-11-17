<template>
  <v-card :to="to" elevation="2" class="place-card h-100" hover>
    <v-img :src="imageUrl" :alt="title" aspect-ratio="1" cover class="bg-grey-lighten-2">
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular indeterminate color="grey-lighten-1" />
        </div>
      </template>
      <!-- Visual hint only: the whole card is the link. -->
      <div class="hover-overlay" aria-hidden="true">
        <span class="hover-label">{{ t(translations.viewPlace) }}</span>
      </div>
    </v-img>

    <v-card-title class="text-body-1 font-weight-medium">
      {{ title }}
    </v-card-title>

    <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
  </v-card>
</template>

<script setup>
import { useLanguage, translations } from "@/composables/useLanguage";

const { t } = useLanguage();

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
  to: {
    type: [String, Object],
    required: true,
  },
});
</script>

<style scoped>
.hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hover-label {
  background: #ffffff;
  color: #00616d;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: 500;
}

.place-card:hover .hover-overlay,
.place-card:focus-visible .hover-overlay {
  opacity: 1;
}
</style>
