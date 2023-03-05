<template>
  <div>
    <v-main>
      <v-container class="mx-40">
        <v-row>
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
                <v-carousel-item
                  v-for="(photo, i) in photos"
                  :key="i"
                  :src="photo.ThumbFile.base64"
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
          <v-col cols="12">
            <v-expansion-panels v-model="panel" multiple>
              <v-expansion-panel>
                <v-expansion-panel-header
                  color="#BDBDBD"
                  class="font-weight-black"
                >
                  Designation
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ designations }}
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header
                  color="#BDBDBD"
                  class="font-weight-black"
                >
                  Place Description
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ fieldsByLang[currentLang].placeDescription }}
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header
                  color="#BDBDBD"
                  class="font-weight-black"
                >
                  Heritage Value
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ fieldsByLang[currentLang].heritageValue }}
                </v-expansion-panel-content>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    color="#BDBDBD"
                    class="font-weight-black"
                  >
                    Character Definition
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    {{ fieldsByLang[currentLang].characterDef }}
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    color="#BDBDBD"
                    class="font-weight-black"
                  >
                    Additional Information
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    {{ fieldsByLang[currentLang].additionalInfo }}
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header
                    color="#BDBDBD"
                    class="font-weight-black"
                  >
                    Description of Boundaries
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    {{ fieldsByLang[currentLang].descBound }}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
// import PrintButton from "../components/PrintButton";
// import MapLoader from "../components/MapLoader";

// import { REGISTER_URL } from "../../urls";
import axios from "axios";

export default {
  name: "placesForm",
  components: {
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
    placeId: null,
    photos: [],
    infoLoaded: false,
  }),
  created() {
    this.saveCurrentPlace();
    this.loadItem(localStorage.currentPlaceId);
  },
  methods: {
    handleClick(value) {
      //Redirects the user to the site form
      this.currentLang = value;
    },
    checkPath(word) {
      let path = this.$route.path.split("/");
      if (path[2] == word) {
        return true;
      }
      return false;
    },
    saveCurrentPlace() {
      if (this.$route.params.id) {
        localStorage.currentPlaceId = this.$route.params.id;
      }
      this.placeId = localStorage.currentPlaceId;
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

      (this.fieldsByLang.En.placeDescription = place.placeDescriptionEn || ""),
        (this.fieldsByLang.En.heritageValue = place.heritageValueEn || ""),
        (this.fieldsByLang.En.characterDef = place.characterDefEn || ""),
        (this.fieldsByLang.En.descBound = place.descBoundEn || ""),
        (this.fieldsByLang.En.additionalInfo = place.additionalInfoEn || ""),
        (this.fieldsByLang.Fr.placeDescription =
          place.placeDescriptionFr || ""),
        (this.fieldsByLang.Fr.heritageValue = place.heritageValueFr || ""),
        (this.fieldsByLang.Fr.characterDef = place.characterDefFr || ""),
        (this.fieldsByLang.Fr.descBound = place.descBoundFr || ""),
        (this.fieldsByLang.Fr.additionalInfo = place.additionalInfoFr || ""),
        (this.infoLoaded = true);
    },
  },
  computed: {
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
      console.log(printData);
      return printData;
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
