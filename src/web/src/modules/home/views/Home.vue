<template>
  <v-container fluid class="pa-0">
    <!-- Hero Carousel Section -->
    <v-row no-gutters justify="center" class="mt-10 pt-10">
      <v-col cols="12" md="8" class="pa-0">
        <hero-carousel :slides="heroSlides" />
      </v-col>
    </v-row>

    <!-- Main Content -->
    <v-container>
      <v-row no-gutters justify="center" class="">
        <v-col cols="12" md="8" class="pa-0">
          <p class="text-h5 font-weight-light mb-2 text-yg_sun">
            Historic places in the Yukon are a tangible record of the people,
            events and activities that have shaped our way of life and our
            environment.
          </p>
        </v-col>
      </v-row>
      <!-- Description Section -->
      <v-row class="mt-8 mb-8">
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

      <!-- Mobile Notice -->
      <v-row class="mb-8">
        <v-col cols="12" md="8" class="mx-auto">
          <v-alert color="info" variant="tonal" class="d-flex align-center">
            <v-icon start icon="mdi-cellphone" class="mr-2"></v-icon>
            <div>
              <strong>Mobile Friendly:</strong> Visit our website on your mobile
              phone to find and learn about Yukon Historic Places that are near
              to where you are.
            </div>
          </v-alert>
        </v-col>
      </v-row>

      <!-- Features Section -->
      <v-row class="mb-8">
        <v-col cols="12" md="8" class="mx-auto">
          <h2 class="text-h5 mb-4">Explore Historic Places</h2>
          <v-row>
            <v-col cols="12" md="4">
              <v-card class="h-100" elevation="2">
                <v-card-item>
                  <template v-slot:prepend>
                    <v-icon
                      size="large"
                      color="primary"
                      icon="mdi-map-marker"
                    ></v-icon>
                  </template>
                  <v-card-title>Map View</v-card-title>
                </v-card-item>
                <v-card-text>
                  Explore historic places on an interactive map. Find locations
                  near you and discover their historical significance.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" variant="text" to="/map" block>
                    View Map
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card class="h-100" elevation="2">
                <v-card-item>
                  <template v-slot:prepend>
                    <v-icon
                      size="large"
                      color="primary"
                      icon="mdi-format-list-bulleted"
                    ></v-icon>
                  </template>
                  <v-card-title>List View</v-card-title>
                </v-card-item>
                <v-card-text>
                  Browse through our comprehensive list of historic places.
                  Filter and search to find specific locations or types of
                  sites.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" variant="text" to="/places" block>
                    View List
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card class="h-100" elevation="2">
                <v-card-item>
                  <template v-slot:prepend>
                    <v-icon
                      size="large"
                      color="primary"
                      icon="mdi-magnify"
                    ></v-icon>
                  </template>
                  <v-card-title>Search</v-card-title>
                </v-card-item>
                <v-card-text>
                  Search for specific historic places by name, location, or
                  historical significance.
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" variant="text" to="/places" block>
                    Search Places
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import places from "@/modules/places/data/places.json";
import HeroCarousel from "../components/HeroCarousel.vue";

export default {
  name: "HomeView",
  components: {
    HeroCarousel,
  },
  data() {
    // Helper to get 5 random, visually distinct places with images
    function getRandomDistinctPlaces(placesList, count) {
      const usedIndexes = new Set();
      const result = [];
      while (result.length < count && usedIndexes.size < placesList.length) {
        const idx = Math.floor(Math.random() * placesList.length);
        const place = placesList[idx];
        if (
          !usedIndexes.has(idx) &&
          place.PlaceId &&
          place.PrimaryName &&
          place.Community
        ) {
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
    return {
      heroSlides: getRandomDistinctPlaces(places.PlacesList, 5),
      features: [
        {
          icon: "mdi-map-marker",
          title: "Map View",
          description: "Explore historic places on an interactive map",
          route: "/map",
        },
        {
          icon: "mdi-format-list-bulleted",
          title: "List View",
          description:
            "Browse through our comprehensive list of historic places",
          route: "/places",
        },
        {
          icon: "mdi-magnify",
          title: "Search",
          description: "Search for specific historic places",
          route: "/places",
        },
      ],
    };
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
