<template>
  <!-- Not auto-advancing: users move between slides with the arrows when they choose to. -->
  <v-carousel show-arrows hide-delimiters>
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-img :src="slide.PhotoURL" :alt="slide.PrimaryName" cover class="fill-height">
        <router-link :to="`/places/view/${slide.PlaceId}`" class="slide-link">
          <v-sheet class="position-absolute bottom-0 w-100 hero-caption pa-4">
            <div class="text-white text-shadow text-center text-h6">
              {{ slide.PrimaryName }}
            </div>
            <div class="text-white text-shadow text-center text-body-2">
              {{ slide.Community }}
            </div>
          </v-sheet>
        </router-link>
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
defineProps({
  slides: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* The whole slide is the link, so mouse, keyboard and screen reader users
   all reach the place page the same way. */
.slide-link {
  position: absolute;
  inset: 0;
  display: block;
  color: inherit;
  text-decoration: none;
}

.slide-link:focus-visible {
  outline: 3px solid #f2a900;
  outline-offset: -3px;
}

.hero-caption {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
}
</style>
