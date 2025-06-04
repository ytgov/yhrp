<template>
  <div class="places-list">
    <PlaceHeader :current-lang="currentLang" :place-name="'Historic Places'" />
    <v-container>
      <v-row>
        <v-col cols="12">
          <div
            class="d-flex flex-column flex-sm-row align-sm-center justify-space-between gap-4"
          >
            <h1 class="text-h4 mb-4 mb-sm-0">
              List of Historic Places {{ filterText }}
              {{ photoCountText }}
            </h1>
            <div class="d-flex flex-column flex-sm-row gap-4 pt-4">
              <v-select
                v-model="selectedLocation"
                :items="locations"
                label="Filter by Location"
                clearable
                @update:model-value="handleLocationChange"
                class="flex-grow-1"
                density="comfortable"
                style="min-width: 200px; max-width: 400px"
              ></v-select>
            </div>
          </div>
        </v-col>
      </v-row>

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
        <v-col
          v-for="(item, i) in filteredPlaces"
          :key="`photo-${i}`"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
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
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import PlaceCard from "../components/PlaceCard.vue";
import PlaceHeader from "../components/PlaceHeader.vue";
import { fetchPlaces } from "../services/placesApi";

const router = useRouter();

// State
const currentLang = ref("EN");
const search = ref("");
const selectedSorter = ref(0);
const sortOptions = ref([]);
const photos = ref([]);
const sortedData = ref([]);
const numberOfPages = ref(1);
const page = ref(1);
const totalLength = ref(0);
const page_size = ref(12);
const placesList = ref([]);
const loading = ref(false);
const error = ref(null);
const queryRules = ref([]);
const queryBuilder = ref({ children: [] });
const queryLabels = ref({
  matchType: null,
  matchTypes: [{}],
  addRule: "Add Filter",
  removeRule: "&times;",
  textInputPlaceholder: "",
});
const queryBody = ref({});
const filterText = ref(null);
const showFilterSection = ref(false);
const savedFilters = ref([]);
const selectedFilters = ref([]);
const selectedLocation = ref(null);

// Computed
const totalPlaces = computed(() => placesList.value.length);

const locations = computed(() => {
  return [...new Set(placesList.value.map((place) => place.location))];
});

const filteredPlaces = computed(() => {
  if (!selectedLocation.value) {
    return placesList.value;
  }
  return placesList.value.filter(
    (place) => place.location === selectedLocation.value
  );
});

const sortByName = computed(() => {
  return placesList.value
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
});

const sortByRating = computed(() => {
  return placesList.value
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
});

const sortByAge = computed(() => {
  return placesList.value
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
});

const queryBuilderEmpty = computed(() => {
  return (
    !queryBuilder.value.children || queryBuilder.value.children.length === 0
  );
});

const photoCountText = computed(() => {
  return totalLength.value ? `(${totalLength.value})` : "(0)";
});

const showFiltersText = computed(() => {
  return showFilterSection.value ? "Hide Filters" : "Show Filters";
});

// Methods
const photoURL = (placeId) => {
  return `http://register.yukonhistoricplaces.ca/Images/Places/${placeId}/1.jpg`;
};

const handleClick = (place) => {
  router.push({
    name: "placeView",
    params: { placeId: place.placeId || place.id },
  });
};

const getDataFromApi = async () => {
  loading.value = true;
  try {
    const places = await fetchPlaces();
    placesList.value = places;
    totalLength.value = places.length;
  } catch (error) {
    console.error("Error fetching places:", error);
    error.value = "Failed to load places. Please try again later.";
  } finally {
    loading.value = false;
  }
};

const runQuery = () => {
  getDataFromApi();
};

const buildQueryBody = () => {
  queryBody.value = { query: [] };
  if (search.value) {
    queryBody.value.query.push({
      field: "featureName",
      operator: "contains",
      value: search.value,
    });
  }
  if (queryBuilder.value.children) {
    queryBuilder.value.children.forEach((x) => {
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
      queryBody.value.query.push(rule);
    });
  }
  queryBody.value.page = page.value;
};

const handleFilterChange = (newFilters) => {
  selectedFilters.value = newFilters;
  runQuery();
};

const handleLocationChange = (location) => {
  selectedLocation.value = location;
  filterText.value = location ? `in ${location}` : "";
};

// Watchers
watch(
  selectedSorter,
  () => {
    // this.sortData();
  },
  { deep: true }
);

watch(page, () => {
  getDataFromApi();
});

// Lifecycle
onMounted(() => {
  page.value = 1;
  page_size.value = 12;
  getDataFromApi();
});
</script>

<style scoped>
.v-col {
  transition: all 0.3s ease;
}
</style>
