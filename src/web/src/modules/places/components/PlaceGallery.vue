<template>
  <div class="place-gallery">
    <v-card>
      <v-carousel
        cycle
        :height="carouselHeight"
        hide-delimiter-background
        show-arrows="hover"
        class="gallery-carousel"
      >
        <v-carousel-item
          v-for="(photo, i) in photoModels"
          :key="i"
          :src="photo.base64Image"
          reverse-transition="fade-transition"
          transition="fade-transition"
          @click="openFullscreen(i)"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-row>
          </template>
          <div v-if="isLoading" class="loading-overlay">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
          <div class="carousel-caption">
            <div class="caption-title">{{ photo.displayName }}</div>
            <div class="caption-text">{{ photo.displayCaption }}</div>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-card>

    <!-- Fullscreen Viewer -->
    <v-dialog
      v-model="fullscreenViewer"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="fullscreenViewer = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title
            >Photo {{ currentPhotoIndex + 1 }} of
            {{ photoModels.length }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-img
          :src="currentPhotoURL"
          contain
          height="100%"
          class="fullscreen-image"
        ></v-img>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { PhotoModel } from "../models/Photo";

export default {
  name: "PlaceGallery",
  props: {
    placeId: {
      type: [String, Number],
      required: true,
    },
    photos: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    fullscreenViewer: false,
    currentPhotoIndex: 0,
    windowWidth: window.innerWidth,
    isLoading: true,
  }),
  computed: {
    carouselHeight() {
      return this.windowWidth < 600 ? "300" : "500";
    },
    currentPhotoURL() {
      return this.photoModels[this.currentPhotoIndex]?.base64Image || "";
    },
    photoModels() {
      return this.photos.map((photo) => new PhotoModel(photo));
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.loadImages();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    openFullscreen(index) {
      this.currentPhotoIndex = index;
      this.fullscreenViewer = true;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    loadImages() {
      this.isLoading = true;
      Promise.all(
        this.photoModels.map((photo) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.src = photo.base64Image;
          });
        })
      ).then(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>

<style scoped>
.place-gallery {
  width: 100%;
}

.gallery-carousel {
  cursor: pointer;
}

.fullscreen-image {
  background-color: black;
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px;
}

.caption-title {
  font-weight: bold;
}

.caption-text {
  font-size: 0.9em;
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
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

@media (max-width: 600px) {
  .gallery-carousel {
    border-radius: 0;
  }
}
</style>
