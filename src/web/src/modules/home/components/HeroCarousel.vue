<template>
  <v-carousel cycle show-arrows="hover" class="hero-carousel" hide-delimiters>
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
      @click="navigateToPlace(slide.PlaceId)"
      class="cursor-pointer"
    >
      <v-img :src="slide.PhotoURL" cover class="fill-height">
        <div class="fill-height position-relative">
          <v-sheet
            class="position-absolute bottom-0 w-100"
            color="rgba(0, 0, 0, 0.3)"
            gradient="to top, rgba(0,0,0,.7), rgba(0,0,0,.1)"
          >
            <v-card-title class="text-white text-shadow text-center pb-0">
              {{ slide.PrimaryName }}
            </v-card-title>
            <v-card-subtitle class="text-white text-shadow text-center">
              {{ slide.Community }}
            </v-card-subtitle>
          </v-sheet>
        </div>
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "HeroCarousel",
  props: {
    slides: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    navigateToPlace(placeId) {
      this.router.push(`/places/view/${placeId}`);
    },
  },
};
</script>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.cursor-pointer {
  cursor: pointer;
}
</style>
