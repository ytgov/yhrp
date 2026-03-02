<template>
  <div class="places-list">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div
            class="d-flex flex-column flex-sm-row align-sm-center justify-space-between gap-4"
          >
            <h1 class="text-h4 mb-4 mb-sm-0">
              List of Historic Places {{ photoCountText }}
            </h1>
          </div>
        </v-col>
      </v-row>

      <v-row v-if="loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
            class="mt-4"
          ></v-progress-circular>
        </v-col>
      </v-row>
      <v-row v-else-if="error">
        <v-col cols="12" class="text-center">
          <v-alert type="error" class="mt-4">
            {{ error }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-else-if="placesList.length === 0">
        <v-col cols="12" class="text-center">
          <v-alert type="info" class="mt-4"> No places found </v-alert>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          v-for="(item, i) in placesList"
          :key="`photo-${i}`"
          cols="12"
          sm="6"
          md="4"
          xl="3"
        >
          <place-card
            :image-url="photoURL(item)"
            :title="item.name"
            :subtitle="item.location"
            @click="handleClick(item)"
          />
        </v-col>
      </v-row>

      <v-row class="mb-2" v-if="!loading">
        <v-col>
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="numberOfPages"
              :total-visible="5"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import PlaceCard from "@/modules/places/components/PlaceCard.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { fetchPlacePhotos, fetchPlaces } from "../services/placesApi";

const router = useRouter();

const numberOfPages = ref(1);
const page = ref(1);
const totalLength = ref(0);
const placesList = ref([]);
const loading = ref(false);
const error = ref(null);
const photoUrls = ref(new Map());

const photoCountText = computed(() => {
  return totalLength.value ? `(${totalLength.value})` : "(0)";
});

const photoURL = (place) => {
  return photoUrls.value.get(place.id) || "";
};

const loadPhotoUrls = async () => {
  for (const place of placesList.value) {
    try {
      const photos = await fetchPlacePhotos(place.id);
      if (photos && photos.length > 0) {
        photoUrls.value.set(place.id, photos[0].imageUrl);
      }
    } catch (err) {
      console.error(`Error loading photo for place ${place.id}:`, err);
    }
  }
};

const handleClick = (place) => {
  router.push({
    name: "placeView",
    params: { placeId: place.placeId },
  });
};

const getDataFromApi = async () => {
  loading.value = true;
  try {
    const response = await fetchPlaces(page.value);
    placesList.value = response.places;
    totalLength.value = response.total;
    numberOfPages.value = Math.ceil(response.total / response.pageSize);
    await loadPhotoUrls();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

watch(page, () => {
  getDataFromApi();
});

onMounted(() => {
  getDataFromApi();
});
</script>

<style scoped>
.v-col {
  transition: all 0.3s ease;
}
</style>
