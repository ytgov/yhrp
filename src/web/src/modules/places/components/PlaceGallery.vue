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
          v-for="(photo, i) in photos"
          :key="i"
          :src="photoURL(i + 1)"
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
            {{ photos.length }}</v-toolbar-title
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
export default {
  name: "PlaceGallery",
  props: {
    placeId: {
      type: [String, Number],
      required: true,
    },
    photos: {
      type: Array,
      default: () => [1, 2, 3, 4],
    },
  },
  data: () => ({
    fullscreenViewer: false,
    currentPhotoIndex: 0,
    windowWidth: window.innerWidth,
  }),
  computed: {
    carouselHeight() {
      return this.windowWidth < 600 ? "300" : "500";
    },
    currentPhotoURL() {
      return this.photoURL(this.currentPhotoIndex + 1);
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    photoURL(index) {
      return `http://register.yukonhistoricplaces.ca/Images/Places/${this.placeId}/${index}.jpg`;
    },
    openFullscreen(index) {
      this.currentPhotoIndex = index;
      this.fullscreenViewer = true;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
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

@media (max-width: 600px) {
  .gallery-carousel {
    border-radius: 0;
  }
}
</style>
