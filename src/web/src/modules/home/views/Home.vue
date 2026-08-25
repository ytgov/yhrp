<template>
  <v-container fluid class="pa-0">
    <v-row v-if="carouselLoading" gap="0" class="justify-center mt-10 pt-10">
      <v-col cols="12" md="8" class="pa-0 text-center">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>
    <v-row
      v-else-if="heroSlides.length"
      gap="0"
      class="justify-center mt-10 pt-10"
    >
      <v-col cols="12" md="8" class="pa-0">
        <HeroCarousel :slides="heroSlides" />
      </v-col>
    </v-row>

    <v-container>
      <v-row class="my-8">
        <v-col cols="12" md="8" class="mx-auto">
          <h2 class="text-h4 font-weight-bold mb-4 text-yg_sun">
            {{ t(translations.heroText) }}
          </h2>
          <p class="text-h6 font-weight-regular mb-4">
            {{ t(translations.heroSubtext1) }}
          </p>
          <p class="text-h6 font-weight-regular mb-4">
            {{ t(translations.heroSubtext2) }}
          </p>
          <p class="text-h6 font-weight-regular">
            {{ t(translations.heroSubtext3) }}
          </p>
        </v-col>
      </v-row>

      <v-row class="mb-8">
        <v-col cols="12" md="8" class="mx-auto">
          <h2 class="text-h5 mb-4">{{ t(translations.exploreHistoricPlaces) }}</h2>
          <v-row>
            <v-col v-for="feature in features" :key="feature.key" cols="12" md="4">
              <v-card class="feature-card h-100" elevation="2">
                <v-card-item>
                  <template #prepend>
                    <v-icon size="large" color="primary" :icon="feature.icon" />
                  </template>
                  <v-card-title>{{ feature.title }}</v-card-title>
                </v-card-item>
                <v-card-text>{{ feature.description }}</v-card-text>
                <template #actions>
                  <v-btn color="primary" variant="flat" :to="feature.route" block>
                    {{ feature.buttonText }}
                  </v-btn>
                </template>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useLanguage, translations } from "@/composables/useLanguage";
import { fetchAllPlaces } from "@/modules/places/services/placesApi";
import HeroCarousel from "../components/HeroCarousel.vue";

const { t, isEnglish } = useLanguage();

const carouselLoading = ref(true);
const featuredPlaces = ref([]);

const SLIDE_COUNT = 5;

/**
 * Pick up to `count` random places that have a photoUrl.
 * @param {Array} placesList
 * @param {number} count
 */
function getRandomPlacesWithPhotos(placesList, count) {
  const withPhotos = placesList.filter((place) => place.photoUrl);
  const usedIndexes = new Set();
  const result = [];

  while (result.length < count && usedIndexes.size < withPhotos.length) {
    const idx = Math.floor(Math.random() * withPhotos.length);
    if (usedIndexes.has(idx)) continue;
    usedIndexes.add(idx);
    result.push(withPhotos[idx]);
  }

  return result;
}

const heroSlides = computed(() =>
  featuredPlaces.value.map((place) => ({
    PlaceId: place.placeId,
    PhotoURL: place.photoUrl,
    PrimaryName: place.localizedName(isEnglish.value),
    Community: place.localizedLocation(isEnglish.value),
  }))
);

const loadHeroSlides = async () => {
  carouselLoading.value = true;
  try {
    const places = await fetchAllPlaces();
    featuredPlaces.value = getRandomPlacesWithPhotos(places, SLIDE_COUNT);
  } catch {
    featuredPlaces.value = [];
  } finally {
    carouselLoading.value = false;
  }
};

onMounted(() => {
  loadHeroSlides();
});

const features = computed(() => [
  {
    key: "map",
    icon: "mdi-map-marker",
    title: t(translations.mapView),
    description: t(translations.mapViewDescription),
    buttonText: t(translations.viewMap),
    route: "/map",
  },
  {
    key: "list",
    icon: "mdi-format-list-bulleted",
    title: t(translations.listView),
    description: t(translations.listViewDescription),
    buttonText: t(translations.viewList),
    route: "/places",
  },
  {
    key: "search",
    icon: "mdi-magnify",
    title: t(translations.search),
    description: t(translations.searchDescription),
    buttonText: t(translations.searchPlaces),
    route: "/places",
  },
]);
</script>

<style scoped>
.feature-card {
  display: flex;
  flex-direction: column;
}

.feature-card :deep(.v-card-text) {
  flex-grow: 1;
}

.feature-card :deep(.v-card-actions) {
  padding: 16px;
}
</style>
