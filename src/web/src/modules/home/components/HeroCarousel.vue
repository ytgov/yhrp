<template>
  <v-carousel cycle show-arrows="hover" hide-delimiters>
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      class="cursor-pointer"
      @click="navigateToPlace(slide.PlaceId)"
    >
      <v-img
        :src="failedSlides.has(i) ? slide.ThumbURL : slide.PhotoURL"
        :lazy-src="slide.ThumbURL"
        cover
        class="fill-height"
        @error="failedSlides.add(i)"
      >
        <div class="fill-height position-relative">
          <v-sheet class="position-absolute bottom-0 w-100 hero-caption pa-4">
            <div class="text-white text-shadow text-center text-h6">
              {{ slide.PrimaryName }}
            </div>
            <div class="text-white text-shadow text-center text-body-2">
              {{ slide.Community }}
            </div>
          </v-sheet>
        </div>
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

defineProps({
  slides: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const router = useRouter();

// Slides whose full-size photo failed to load — shown with the thumbnail instead
const failedSlides = reactive(new Set());

const navigateToPlace = (placeId) => {
  router.push(`/places/view/${placeId}`);
};
</script>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.cursor-pointer {
  cursor: pointer;
}

.hero-caption {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
}
</style>
