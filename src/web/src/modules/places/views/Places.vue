<template>
  <v-app-bar color="white" flat class="pb-4">
    <v-toolbar-title class="black--text mr-2">
      List of Historic Places {{ this.filterText }}
      {{ this.photoCountText }}</v-toolbar-title
    >

    <v-spacer></v-spacer>
    <query-multi-select
      class="mr-5"
      :value="selectedFilters"
      @input="handleFilterChange"
    ></query-multi-select>
  </v-app-bar>
  <v-container>
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
      <v-col v-for="(item, i) in placesList" :key="`photo-${i}`" cols="4">
        <place-card
          :image-url="photoURL(item.id)"
          :title="item.community"
          :subtitle="item.name"
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
</template>
<script>
import PlaceCard from "../components/PlaceCard.vue";
import QueryMultiSelect from "../components/QueryMultiSelect.vue";
import { fetchPlaces } from "../services/placesApi";

export default {
  name: "HistoricPlaces",
  components: { QueryMultiSelect, PlaceCard },
  props: {
    initialPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 12,
    },
  },
  data: () => ({
    search: "",
    selectedSorter: 0,
    sortOptions: [],
    photos: [],
    sortedData: [],
    numberOfPages: 1,
    page: 1,
    totalLength: 0,
    page_size: 12,
    placesList: [],
    loading: false,
    error: null,
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
    selectedFilters: [],
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
    this.page = this.initialPage;
    this.page_size = this.pageSize;
    this.getDataFromApi();
  },
  methods: {
    photoURL(placeId) {
      return `http://register.yukonhistoricplaces.ca/Images/Places/${placeId}/1.jpg`;
    },
    handleClick(place) {
      this.$router.push({
        name: "placeView",
        params: { placeId: place.id },
      });
    },
    async getDataFromApi() {
      this.loading = true;
      this.error = null;
      this.buildQueryBody();

      try {
        const response = await fetchPlaces({
          page: this.page,
          pageSize: this.page_size,
          search: this.search,
        });

        this.placesList = response.data;
        this.totalLength = response.meta.item_count;
        this.numberOfPages = response.meta.page_count;
        this.page_size = response.meta.page_size;
      } catch (error) {
        console.error("Error fetching places:", error);
        this.error = "Failed to load places. Please try again later.";
      } finally {
        this.loading = false;
      }
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
    handleFilterChange(newFilters) {
      this.selectedFilters = newFilters;
      this.runQuery();
    },
  },
  computed: {
    totalPlaces() {
      return this.placesList.length;
    },
    sortByName() {
      return this.placesList
        .slice()
        .sort((a, b) =>
          !a.name || !b.name
            ? 0
            : a.name.toLowerCase() > b.name.toLowerCase()
            ? 1
            : b.name.toLowerCase() > a.name.toLowerCase()
            ? -1
            : 0
        );
    },
    sortByRating() {
      return this.placesList
        .slice()
        .sort((a, b) =>
          !a.rating || !b.rating
            ? 0
            : a.rating > b.rating
            ? 1
            : b.rating > a.rating
            ? -1
            : 0
        );
    },
    sortByAge: function () {
      return this.placesList
        .slice()
        .sort((a, b) =>
          !a.recognitionDate || !b.recognitionDate
            ? 0
            : a.recognitionDate > b.recognitionDate
            ? 1
            : b.recognitionDate > a.recognitionDate
            ? -1
            : 0
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
