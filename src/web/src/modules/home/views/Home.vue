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
            Historic places in the Yukon are a tangible record of the people,
            events and activities that have shaped our way of life and our
            environment.
          </p>
        </v-col>
      </v-row>

      <v-row class="my-8">
        <v-col cols="12" md="8" class="mx-auto">
          <p class="text-h6 font-weight-light mb-4">
            Our historic places represent the technologies, designs and ideas
            that are the framework of our society and the basis for our future.
          </p>
          <p class="text-body-1">
            Many places are landmarks within a community, are associated with
            remarkable people or historical events, or are places that have
            cultural, social, scientific or architectural significance.
          </p>
          <p class="text-body-1 mt-4">
            The Register is an online resource of Yukon's historic places that
            have been designated as historically significant on a municipal,
            territorial or national level. You can explore Yukon's history by
            searching our website for historic places by location on a map, in a
            list or via name.
          </p>
        </v-col>
      </v-row>

      <v-row class="mb-8">
        <v-col cols="12" md="8" class="mx-auto">
          <h2 class="text-h5 mb-4">Explore Historic Places</h2>
          <v-row>
            <v-col v-for="feature in features" :key="feature.title" cols="12" md="4">
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
                    {{ feature.title }}
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
import places from "@/modules/places/data/places.json";
import HeroCarousel from "../components/HeroCarousel.vue";

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

const features = [
  {
    icon: "mdi-map-marker",
    title: "Map View",
    description: "Explore historic places on an interactive map. Find locations near you and discover their historical significance.",
    route: "/map",
  },
  {
    icon: "mdi-format-list-bulleted",
    title: "List View",
    description: "Browse through our comprehensive list of historic places. Filter and search to find specific locations or types of sites.",
    route: "/places",
  },
  {
    icon: "mdi-magnify",
    title: "Search",
    description: "Search for specific historic places by name, location, or historical significance.",
    route: "/places",
  },
];
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
