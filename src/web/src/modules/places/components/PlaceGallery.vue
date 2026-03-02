<template>
  <div class="place-gallery position-relative w-100 bg-grey-lighten-3 rounded-lg overflow-hidden">
    <v-carousel
      v-if="photos.length > 0"
      :show-arrows="photos.length > 1"
      hide-delimiter-background
      delimiter-icon="mdi-circle"
      height="400"
      @update:model-value="handlePhotoChange"
    >
      <v-carousel-item
        v-for="photo in photos"
        :key="photo.id"
        :src="photo.imageUrl"
        cover
        class="cursor-pointer"
        @click="openFullscreen(photo)"
      >
        <div v-if="photo.caption" class="photo-caption">
          {{ photo.caption }}
        </div>
      </v-carousel-item>
    </v-carousel>

    <div v-else class="d-flex flex-column align-center justify-center" style="height: 400px">
      <v-icon size="64" color="grey">mdi-image-off</v-icon>
      <p class="text-grey mt-2">No photos available</p>
    </div>

    <v-card v-if="currentPhoto?.comments" flat class="mt-2">
      <v-card-text class="text-body-2 text-grey-darken-1">
        {{ currentPhoto.comments }}
      </v-card-text>
    </v-card>

    <div v-if="loading" class="loading-overlay d-flex align-center justify-center">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <v-dialog v-model="fullscreen" fullscreen>
      <v-card>
        <v-toolbar color="primary">
          <v-btn icon="mdi-close" @click="fullscreen = false" />
          <v-toolbar-title>Photo Gallery</v-toolbar-title>
        </v-toolbar>

        <v-carousel
          v-model="currentPhotoIndex"
          :show-arrows="photos.length > 1"
          hide-delimiter-background
          delimiter-icon="mdi-circle"
          height="100%"
          @update:model-value="handlePhotoChange"
        >
          <v-carousel-item
            v-for="photo in photos"
            :key="photo.id"
            :src="photo.imageUrl"
            cover
          >
            <div v-if="photo.caption" class="photo-caption">
              {{ photo.caption }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { fetchPlacePhotos } from "../services/placesApi";

const props = defineProps({
  placeId: {
    type: [Number, String],
    required: true,
  },
});

const photos = ref([]);
const loading = ref(true);
const fullscreen = ref(false);
const currentPhotoIndex = ref(0);
const currentPhoto = ref(null);

const loadPhotos = async () => {
  try {
    loading.value = true;
    const photoData = await fetchPlacePhotos(props.placeId);
    photos.value = photoData;
    if (photoData.length > 0) {
      currentPhoto.value = photoData[0];
    }
  } catch (error) {
    console.error("Error loading photos:", error);
  } finally {
    loading.value = false;
  }
};

const handlePhotoChange = (index) => {
  if (photos.value[index]) {
    currentPhoto.value = photos.value[index];
  }
};

const openFullscreen = (photo) => {
  const index = photos.value.findIndex((p) => p.id === photo.id);
  if (index !== -1) {
    currentPhotoIndex.value = index;
    fullscreen.value = true;
    currentPhoto.value = photo;
  }
};

onMounted(() => {
  loadPhotos();
});
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.photo-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
}
</style>
