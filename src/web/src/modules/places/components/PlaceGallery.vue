<template>
  <div class="place-gallery">
    <v-carousel
      v-if="photos.length > 0"
      :show-arrows="photos.length > 1"
      hide-delimiter-background
      delimiter-icon="mdi-circle"
      height="400"
      class="rounded-lg"
      @update:model-value="handlePhotoChange"
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

    <!-- Photo Details -->
    <v-card v-if="currentPhoto" class="">
      <div class="d-flex align-center mb-2"></div>

      <div v-if="currentPhoto.comments" class="text-body-2 text-grey">
        {{ currentPhoto.comments }}
      </div>
    </v-card>

    <!-- Debug Section -->
    <v-expansion-panels class="mt-4">
      <v-expansion-panel>
        <v-expansion-panel-title class="bg-grey-lighten-4">
          Debug: Raw Photo Data
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <pre
            class="pa-4 rounded bg-grey-lighten-3 text-body-2"
            style="white-space: pre-wrap; word-break: break-word"
          >
            {{
              JSON.stringify(
                {
                  id: currentPhoto?.id,
                  placeId: currentPhoto?.placeId,
                  featureName: currentPhoto?.featureName,
                  originalFileName: currentPhoto?.originalFileName,
                  datePhotoTaken: currentPhoto?.datePhotoTaken,
                  creator: currentPhoto?.creator,
                  communityName: currentPhoto?.communityName,
                  location: currentPhoto?.location,
                  caption: currentPhoto?.caption,
                  comments: currentPhoto?.comments,
                  creditLine: currentPhoto?.creditLine,
                  subjects: currentPhoto?.subjects,
                  imageWidth: currentPhoto?.imageWidth,
                  imageHeight: currentPhoto?.imageHeight,
                  copyright: currentPhoto?.copyright,
                  usageRights: currentPhoto?.usageRights,
                  isPrivate: currentPhoto?.isPrivate,
                  isSiteDefault: currentPhoto?.isSiteDefault,
                  imageUrl: "[REDACTED]",
                },
                null,
                2
              )
            }}
          </pre>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

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
          @update:model-value="handlePhotoChange"
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

    return {
      photos,
      loading,
      fullscreen,
      currentPhotoIndex,
      currentPhoto,
      openFullscreen,
      handlePhotoChange,
    };
  },
};
</script>

<style scoped>
.place-gallery {
  position: relative;
  width: 100%;
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
  height: 400px;
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
