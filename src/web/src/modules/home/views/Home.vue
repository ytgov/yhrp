<template>
  <v-container fluid class="pa-0">
    <v-row gap="0" class="justify-center mt-10 pt-10">
      <v-col cols="12" md="8" class="pa-0">
        <HeroCarousel :slides="heroSlides" />
      </v-col>
    </v-row>

    <v-container>
      <v-row gap="0" class="justify-center">
        <v-col cols="12" md="8" class="pa-0">
          <p class="text-h5 font-weight-light mb-2 text-yg_sun">
            {{ t(translations.heroText) }}
          </p>
        </v-col>
      </v-row>

      <v-row class="my-8">
        <v-col cols="12" md="8" class="mx-auto">
          <p class="text-h6 font-weight-light mb-4">
            {{ t(translations.heroSubtext1) }}
          </p>
          <p class="text-body-1">
            {{ t(translations.heroSubtext2) }}
          </p>
          <p class="text-body-1 mt-4">
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
import { computed } from "vue";
import { useLanguage, translations } from "@/composables/useLanguage";
import places from "@/modules/places/data/places.json";
import HeroCarousel from "../components/HeroCarousel.vue";

const { t } = useLanguage();

function getRandomDistinctPlaces(placesList, count) {
  const usedIndexes = new Set();
  const result = [];
  while (result.length < count && usedIndexes.size < placesList.length) {
    const idx = Math.floor(Math.random() * placesList.length);
    const place = placesList[idx];
    if (!usedIndexes.has(idx) && place.PlaceId && place.PrimaryName && place.Community) {
      usedIndexes.add(idx);
      result.push({
        PlaceId: place.PlaceId,
        PhotoURL: `http://register.yukonhistoricplaces.ca/Images/Places/${place.PlaceId}/1.jpg`,
        PrimaryName: place.PrimaryName,
        Community: place.Community,
      });
    }
  }
  return result;
}

const heroSlides = getRandomDistinctPlaces(places.PlacesList, 5);

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
