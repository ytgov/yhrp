<template>
  <div class="place-gallery">
    <v-carousel
      v-if="photos.length > 0"
      :show-arrows="photos.length > 1"
      hide-delimiter-background
      delimiter-icon="mdi-circle"
      height="400"
      class="rounded-lg"
    >
      <v-carousel-item
        v-for="photo in photos"
        :key="photo.id"
        :src="photo.imageUrl"
        cover
        @click="openFullscreen(photo)"
      >
        <div class="photo-caption" v-if="photo.caption">
          {{ photo.caption }}
        </div>
      </v-carousel-item>
    </v-carousel>

    <div v-else class="no-photos">
      <v-icon size="64" color="grey">mdi-image-off</v-icon>
      <p>No photos available</p>
    </div>

    <!-- Loading Overlay -->
    <div v-if="loading" class="loading-overlay">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!-- Fullscreen Viewer -->
    <v-dialog v-model="fullscreen" fullscreen>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click="fullscreen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Photo Gallery</v-toolbar-title>
        </v-toolbar>

        <v-carousel
          v-model="currentPhotoIndex"
          :show-arrows="photos.length > 1"
          hide-delimiter-background
          delimiter-icon="mdi-circle"
          height="100%"
        >
          <v-carousel-item
            v-for="photo in photos"
            :key="photo.id"
            :src="photo.imageUrl"
            cover
          >
            <div class="photo-caption" v-if="photo.caption">
              {{ photo.caption }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { fetchPlacePhotos } from "../services/placesApi";

export default {
  name: "PlaceGallery",
  props: {
    placeId: {
      type: [Number, String],
      required: true,
    },
  },
  setup(props) {
    const photos = ref([]);
    const loading = ref(true);
    const fullscreen = ref(false);
    const currentPhotoIndex = ref(0);

    const loadPhotos = async () => {
      try {
        loading.value = true;
        const photoData = await fetchPlacePhotos(props.placeId);
        photos.value = photoData;
      } catch (error) {
        console.error("Error loading photos:", error);
      } finally {
        loading.value = false;
      }
    };

    const openFullscreen = (photo) => {
      const index = photos.value.findIndex((p) => p.id === photo.id);
      if (index !== -1) {
        currentPhotoIndex.value = index;
        fullscreen.value = true;
      }
    };

    onMounted(() => {
      loadPhotos();
    });

    return {
      photos,
      loading,
      fullscreen,
      currentPhotoIndex,
      openFullscreen,
    };
  },
};
</script>

<style scoped>
.place-gallery {
  position: relative;
  width: 100%;
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.photo-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  font-size: 0.9rem;
}

.no-photos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
}

.v-carousel-item {
  cursor: pointer;
}
</style>
