<template>
  <v-app-bar color="white" flat class="pb-4">
    <v-toolbar-title class="black--text mr-2">
      List of Historic Places {{ this.filterText }}
      {{ this.photoCountText }}</v-toolbar-title
    >

    <v-spacer></v-spacer>
    <query-multi-select class="mr-5"></query-multi-select>
  </v-app-bar>
  <v-container>
    <v-row v-if="!loading">
      <v-col
        v-for="(item, i) in placesList.slice(0, 6)"
        :key="`photo-${i}`"
        class="child-flex"
        cols="4"
      >
        <v-hover>
          <template v-slot="{ isHovering, props }">
            <v-card elevation="5" v-bind="props">
              <v-card-title>{{ item.Community || "" }} </v-card-title>

              <!-- <v-overlay absolute color="#036358"> -->

              <v-card flat class="mx-auto">
                <v-img
                  :src="photoURL(item.PlaceId)"
                  class="white--text align-end"
                  aspect-ratio="1"
                  cover
                >
                </v-img>

                <v-card-actions>
                  <v-card-subtitle v-if="selectedSorter == 0">
                    {{ item.PrimaryName }}
                  </v-card-subtitle>
                  <v-card-subtitle v-else>
                    {{ item.PrimaryName }}</v-card-subtitle
                  >
                </v-card-actions>
              </v-card>
              <v-overlay
                persistent
                contained
                :model-value="isHovering"
                class="align-center justify-center"
              >
                <div>
                  <v-btn @click="handleClick(item)">View Place</v-btn>
                </div>
              </v-overlay>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
    <v-row v-if="loading">
      <div class="loading">Loading...</div>
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
</template>
<script>
import placeholderBase64 from "@/assets/no_photo_base64";
import { REGISTER_URL } from "@/urls";
import axios from "axios";
import { get } from "lodash";
import QueryMultiSelect from "../components/QueryMultiSelect.vue";
import localData from "../data/places";

export default {
  name: "HistoricPlaces",
  components: { QueryMultiSelect },
  data: () => ({
    trueThing: true,

    search: "",
    selectedSorter: 0,
    sortOptions: [
      // { name: "Feature name" },
      // { name: "Rating" },
      // { name: "Age" },
    ],
    photos: [],
    sortedData: [],
    numberOfPages: 10,
    page: 1,
    totalLength: 0,
    page_size: 12,
    placesList: [],
    loading: false,
    queryRules: [],
    queryBuilder: { children: [] },
    queryLabels: {
      matchType: null,
      matchTypes: [{}],
      addRule: "Add Filter",
      removeRule: "&times;",
      textInputPlaceholder: "",
    },
    queryBody: {},
    filterText: null,
    showFilterSection: false,
    savedFilters: [],
  }),
  watch: {
    selectedSorter: {
      handler() {
        // this.sortData();
      },
      deep: true,
    },
    page() {
      this.getDataFromApi();
    },
  },
  mounted() {
    this.placesList = localData.PlacesList;
    console.log(this.placesList);
  },
  methods: {
    photoURL: function (siteID) {
      //http://register.yukonhistoricplaces.ca/Images/Places/598/1.jpg
      return `http://register.yukonhistoricplaces.ca/Images/Places/${siteID}/1.jpg`;
    },
    handleClick(value) {
      //Redirects the user to the site form
      this.$router.push({
        name: "placeView",
        // params: { id: value.id, name: value.primaryName },
        params: { name: value.PlaceId },
      });
    },
    getDataFromApi() {
      this.loading = true;
      this.buildQueryBody();

      axios
        .get(`${REGISTER_URL}/`, { params: { page: this.page } })
        .then((resp) => {
          console.log(resp);

          const placesThumbs = get(resp, "data.data", []);

          this.photos = placesThumbs.map((item) => {
            if (get(item, "ThumbFile.data", "")) {
              item.ThumbFile.base64 = `data:image/png;base64,${this.toBase64(
                item.ThumbFile.data
              )}`;
            } else {
              item = { ...item, ThumbFile: { base64: placeholderBase64 } };
            }

            console.log(item);
            return item;
          });

          this.totalLength = resp.data.meta.item_count;
          this.numberOfPages = resp.data.meta.page_count;
          this.page_size = resp.data.meta.page_size;
        })
        .catch((err) => console.error("Error in getDataFromApi: " + err))
        .finally(() => {
          this.loading = false;
        });
    },

    toBase64(arr) {
      return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
    },

    runQuery() {
      this.getDataFromApi();
    },

    buildQueryBody() {
      this.queryBody = { query: [] };
      if (this.search) {
        this.queryBody.query.push({
          field: "featureName",
          operator: "contains",
          value: this.search,
        });
      }
      if (this.queryBuilder.children) {
        this.queryBuilder.children.forEach((x) => {
          let rule = {};
          rule.field = x.query.rule;
          if (rule.field == "legacyBatchInfo") {
            rule.operator =
              x.query.operator == "includes" ? "contains" : "notcontains";
            rule.value = x.query.value;
          } else {
            rule.operator = x.query.operator == "includes" ? "in" : "notin";
            rule.value = x.query.value.join(",");
          }
          this.queryBody.query.push(rule);
        });
      }
      this.queryBody.page = this.page;
    },
  },
  computed: {
    totalPlaces() {
      return this.placesList.length;
    },
    sortByName: function () {
      return (
        this.photos
          .slice()
          //.filter((a) => a.featureName.toLowerCase().includes(this.search.toLowerCase()))
          .sort((a, b) =>
            !a.featureName || !b.featureName
              ? 0
              : a.featureName.toLowerCase() > b.featureName.toLowerCase()
              ? 1
              : b.featureName.toLowerCase() > a.featureName.toLowerCase()
              ? -1
              : 0
          )
      );
    },
    sortByRating: function () {
      return (
        this.photos
          //.filter((a) => a.featureName.toLowerCase().includes(this.search.toLowerCase()))
          .slice()
          .sort((a, b) =>
            !a.rating || !b.rating
              ? 0
              : a.rating > b.rating
              ? 1
              : b.rating > a.rating
              ? -1
              : 0
          )
      );
    },
    sortByAge: function () {
      //let photos =JSON.parse(JSON.stringify(this.photos));
      return (
        this.photos
          //.filter((a) => a.featureName.toLowerCase().includes(this.search.toLowerCase()))
          .slice()
          .sort((a, b) =>
            !a.dateCreated || !b.dateCreated
              ? 0
              : a.dateCreated > b.dateCreated
              ? 1
              : b.dateCreated > a.dateCreated
              ? -1
              : 0
          )
      );
    },
    queryBuilderEmpty: function () {
      return (
        !this.queryBuilder.children || this.queryBuilder.children.length === 0
      );
    },
    photoCountText: function () {
      return this.totalLength ? "(" + this.totalLength + ")" : "(0)";
    },
    showFiltersText: function () {
      return this.showFilterSection ? "Hide Filters" : "Show Filters";
    },
  },
};
</script>

<style scoped></style>
