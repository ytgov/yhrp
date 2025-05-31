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

import { REGISTER_URL } from "@/urls";
import axios from "axios";

export default {
  name: "PlacesForm",
  props: {
    name: {
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
    localPlaceId: "",
  }),
  computed: {
    currentPlaceId() {
      return this.name;
    },
    printData() {
      let printData = {};

      printData.primaryName = this.primaryName;
      printData.communityName = this.communityName;
      printData.latitude = this.latitude;
      printData.longitude = this.longitude;
      printData.recognitionDate = this.recognitionDate;
      printData.designations = this.designations;

      printData = Object.assign(
        {},
        printData,
        this.fieldsByLang[this.currentLang]
      );
      return printData;
    },
  },
  created() {
    // TODO: API Integration
    // 1. Complete backend API implementation
    // 2. Convert to use axios for all API calls
    // 3. Add proper error handling and loading states
    // 4. Implement proper data fetching for place details and photos
    this.loadPlaceData();
    if (this.$route.params.id) {
      localStorage.currentPlaceId = this.$route.params.id;
    }
    this.localPlaceId = localStorage.currentPlaceId;
  },
  methods: {
    async loadPlaceData() {
      // TODO: Implement API integration
      // Temporarily using mock data until API is ready
      this.primaryName = "Sample Place";
      this.communityName = "Sample Community";
      this.latitude = "60.7212";
      this.longitude = "-135.0568";
      this.recognitionDate = "2024-01-01";
      this.designations = "Sample Designation";

      this.fieldsByLang.En = {
        placeDescription: "Sample English description",
        heritageValue: "Sample English heritage value",
        characterDef: "Sample English character definition",
        descBound: "Sample English boundary description",
        additionalInfo: "Sample English additional information",
      };

      this.fieldsByLang.Fr = {
        placeDescription: "Description en français",
        heritageValue: "Valeur patrimoniale en français",
        characterDef: "Définition du caractère en français",
        descBound: "Description des limites en français",
        additionalInfo: "Informations supplémentaires en français",
      };

      this.infoLoaded = true;

      /* Original API call - to be implemented
      try {
        const response = await axios.get(
          `${REGISTER_URL}/places/${this.currentPlaceId}`
        );
        const data = response.data;
        // ... rest of the implementation
      } catch (error) {
        console.error("Error loading place data:", error);
      }
      */
    },
    lang(locale) {
      this.currentLang = locale === "EN" ? "En" : "Fr";
    },
    photoURL(photoIndex) {
      return `http://register.yukonhistoricplaces.ca/Images/Places/${this.currentPlaceId}/${photoIndex}.jpg`;
    },
    handleClick(value) {
      this.currentLang = value;
    },
    checkPath(word) {
      let path = this.$route.path.split("/");
      if (path[2] == word) {
        return true;
      }
      return false;
    },
    loadItem(id) {
      axios
        .get(`${REGISTER_URL}/${id}`)
        .then((resp) => {
          this.setPlace(resp.data);
        })
        .catch((error) => console.error(error));
      axios
        .get(`${REGISTER_URL}/${id}/photos`)
        .then((resp) => {
          this.setPhotos(resp.data);
        })
        .catch((error) => console.error(error));
    },
    setPhotos(photos) {
      this.photos = photos.data.map((x) => {
        x.ThumbFile.base64 = `data:image/png;base64,${this.toBase64(
          x.ThumbFile.data
        )}`;
        return x;
      });
    },
    toBase64(arr) {
      return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
    },
    setPlace({ data: place }) {
      this.primaryName = place.primaryName || "";
      this.communityName = place.communityName || "";
      this.latitude = place.latitude || "";
      this.longitude = place.longitude || "";
      this.recognitionDate = place.recognitionDate || "";
      this.designations = place.designations || "";

      this.fieldsByLang.En = {
        placeDescription: place.placeDescriptionEn || "",
        heritageValue: place.heritageValueEn || "",
        characterDef: place.characterDefEn || "",
        descBound: place.descBoundEn || "",
        additionalInfo: place.additionalInfoEn || "",
      };

      this.fieldsByLang.Fr = {
        placeDescription: place.placeDescriptionFr || "",
        heritageValue: place.heritageValueFr || "",
        characterDef: place.characterDefFr || "",
        descBound: place.descBoundFr || "",
        additionalInfo: place.additionalInfoFr || "",
      };

      this.infoLoaded = true;
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
