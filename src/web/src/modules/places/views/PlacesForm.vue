<template>
  <v-app-bar flat class="text-grey-darken-1">
    <template v-slot:append>
      <v-tooltip text="English">
        <template v-slot:activator="{ props }">
          <span
            v-bind="props"
            class="text-body-1 font-weight-bold"
            @click="lang('EN')"
            >EN</span
          ></template
        ></v-tooltip
      >|
      <v-tooltip text="Français">
        <template v-slot:activator="{ props }">
          <span
            v-bind="props"
            class="text-body-1 font-weight-bold"
            @click="lang('FR')"
            >FR</span
          ></template
        ></v-tooltip
      >
    </template>
  </v-app-bar>

  <v-container width="100%" class="">
    <v-row justify="center">
      <v-col cols="9">
        <h1>{{ communityName }}</h1>
      </v-col>
      <v-col cols="3">
        <v-btn
          class="button"
          v-if="currentLang == 'En'"
          @click="handleClick('Fr')"
          >Francais</v-btn
        >
        <v-btn
          class="button"
          v-if="currentLang == 'Fr'"
          @click="handleClick('En')"
          >English</v-btn
        >
        <v-btn class="mx-1 form-header">Print</v-btn>
        <!-- <PrintButton
              :data="printData"
              :name="printData.primaryName"
              class="mx-1 form-header"
            /> -->
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8">
        <v-card>
          <v-carousel cycle height="500">
            <!-- <v-carousel-item
              v-for="(photo, i) in photos"
              :key="i"
              :src="photo.ThumbFile.base64"
              reverse-transition="fade-transition"
              transition="fade-transition"
              hide-delimiter-background
            ></v-carousel-item> -->
            <v-carousel-item
              v-for="(photo, i) in photos"
              :key="i"
              :src="photoURL(i + 1)"
              reverse-transition="fade-transition"
              transition="fade-transition"
              hide-delimiter-background
            ></v-carousel-item>
          </v-carousel>
          <!-- everytime the image changes it bumps the user to the top of the screen, need to fix so that doesn't happen. Annoying when trying to read the boundary description-->
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card color="#BDBDBD" class="mx-auto" height="500">
          <div style="height: 500">Map will go here</div>
          <!-- <BasicMap></BasicMap> -->
          <!-- <MapLoader
                v-if="infoLoaded"
                :fields="{
                  lat: latitude,
                  long: longitude,
                }"
                height="500"
              /> -->
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h4>{{ primaryName }}</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel>
            <v-expansion-panel-title color="primary" class="font-weight-black">
              Designation
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius
              dolor obcaecati temporibus totam aut at aliquid, fugit, qui
              consequuntur eum asperiores minima exercitationem dolorem,
              accusantium illum corrupti distinctio enim repudiandae!
              {{ designations }}
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title color="primary" class="font-weight-black">
              Place Description
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas
              dolorem distinctio, quam necessitatibus reprehenderit eaque rerum
              quasi omnis totam architecto, facere quaerat! Ducimus voluptates
              sapiente fuga cum nobis in vitae.
              {{ fieldsByLang[currentLang].placeDescription }}
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title color="primary" class="font-weight-black">
              Heritage Value
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
              optio soluta odio recusandae eaque veritatis nihil fuga
              blanditiis, dignissimos voluptatum quia cum vel laboriosam
              quisquam perspiciatis error, placeat accusamus porro!
              {{ fieldsByLang[currentLang].heritageValue }}
              <div>
                <v-expansion-panels class="pt-5">
                  <v-expansion-panel>
                    <v-expansion-panel-title
                      color="#BDBDBD"
                      class="font-weight-black"
                    >
                      Character Definition
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      {{ fieldsByLang[currentLang].characterDef }}
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-title
                      color="#BDBDBD"
                      class="font-weight-black"
                    >
                      Additional Information
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      {{ fieldsByLang[currentLang].additionalInfo }}
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-title
                      color="#BDBDBD"
                      class="font-weight-black"
                    >
                      Description of Boundaries
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      {{ fieldsByLang[currentLang].descBound }}
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import PrintButton from "../components/PrintButton";
// import MapLoader from "../components/MapLoader";
// import BasicMap from "@/modules/components/BasicMap";

import { fetchPlaceById } from "../services/placesApi";

export default {
  name: "PlacesForm",
  props: {
    placeId: {
      type: String,
      required: true,
    },
  },
  components: {
    // BasicMap,
    //MapLoader,
    // PrintButton,
  },
  data: () => ({
    currentLang: "En",
    panel: [0, 1, 2, 3],
    fieldsByLang: {
      En: {
        placeDescription: "",
        heritageValue: "",
        characterDef: "",
        descBound: "",
        additionalInfo: "",
      },
      Fr: {
        placeDescription: "",
        heritageValue: "",
        characterDef: "",
        descBound: "",
        additionalInfo: "",
      },
    },
    primaryName: "",
    communityName: "",
    latitude: "",
    longitude: "",
    recognitionDate: "",
    designations: "",
    selectedImage: null,
    photos: [1, 2, 3, 4],
    infoLoaded: false,
    loading: false,
    error: null,
  }),
  computed: {
    currentPlaceId() {
      return this.placeId;
    },
    printData() {
      return {
        primaryName: this.primaryName,
        communityName: this.communityName,
        latitude: this.latitude,
        longitude: this.longitude,
        recognitionDate: this.recognitionDate,
        designations: this.designations,
        ...this.fieldsByLang[this.currentLang],
      };
    },
  },
  watch: {
    currentPlaceId: {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.fetchPlaceDetails();
        }
      },
    },
  },
  methods: {
    async fetchPlaceDetails() {
      this.loading = true;
      this.error = null;

      try {
        const place = await fetchPlaceById(this.currentPlaceId);

        // Update place details
        this.primaryName = place.name;
        this.communityName = place.community;
        this.latitude = place.location.lat;
        this.longitude = place.location.lng;
        this.recognitionDate = place.recognitionDate;
        this.designations = place.designations;

        // Update language fields
        this.fieldsByLang.En.placeDescription = place.description;
        this.fieldsByLang.Fr.placeDescription = place.description; // TODO: Add French description when available

        // TODO: Add other fields when available in the API
        // this.fieldsByLang.En.heritageValue = place.heritageValueEn;
        // this.fieldsByLang.Fr.heritageValue = place.heritageValueFr;
        // etc...

        this.infoLoaded = true;
      } catch (error) {
        console.error("Error fetching place details:", error);
        this.error = "Failed to load place details";
      } finally {
        this.loading = false;
      }
    },
    photoURL(index) {
      return `http://register.yukonhistoricplaces.ca/Images/Places/${this.currentPlaceId}/${index}.jpg`;
    },
    handleClick(lang) {
      this.currentLang = lang;
    },
    lang(lang) {
      this.currentLang = lang;
    },
  },
};
</script>

<style>
/* Custom CSS for the query builder */
.button {
  background-color: #0097a9 !important;
}
</style>
