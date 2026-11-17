<template>
  <div class="places-list">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="places-list-header">
            <h1 class="text-h4 mb-0">
              {{ t(translations.listOfHistoricPlaces) }} {{ photoCountText }}
            </h1>
            <!--
              Labels sit above each control as real <label for> elements.
              Vuetify's floating `label` prop renders an extra, unassociated
              <label> that accessibility checkers flag as orphaned.
            -->
            <div class="places-sort-controls">
              <div class="places-sort-control">
                <label id="places-search-label" for="places-search" class="control-label">
                  {{ t(translations.searchPlaces) }}
                </label>
                <v-text-field
                  id="places-search"
                  v-model="searchQuery"
                  maxlength="200"
                  :placeholder="t(translations.searchPlaceholder)"
                  prepend-inner-icon="mdi-magnify"
                  density="compact"
                  clearable
                  hide-details
                  color="primary"
                />
              </div>
              <div class="places-sort-control">
                <label id="places-sort-label" for="places-sort" class="control-label">
                  {{ t(translations.sortBy) }}
                </label>
                <v-select
                  id="places-sort"
                  v-model="sortBy"
                  :items="sortOptions"
                  aria-labelledby="places-sort-label"
                  density="compact"
                  hide-details
                />
              </div>
              <div v-if="showFilter" class="places-sort-control">
                <label id="places-filter-label" for="places-filter" class="control-label">
                  {{ filterLabel }}
                </label>
                <v-select
                  id="places-filter"
                  v-model="filterValue"
                  :items="filterOptions"
                  aria-labelledby="places-filter-label"
                  density="compact"
                  hide-details
                />
              </div>
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
            {{ t(translations.placesLoadError) }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-else-if="placesList.length === 0">
        <v-col cols="12" class="text-center">
          <v-alert type="info" class="mt-4">{{
            t(translations.noPlacesFound)
          }}</v-alert>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          v-for="(item, i) in placesList"
          :key="`photo-${i}`"
          cols="12"
          sm="6"
          md="4"
          xl="3"
        >
          <place-card
            :image-url="photoURL(item)"
            :title="item.localizedName(isEnglish)"
            :subtitle="item.localizedLocation(isEnglish)"
            :to="{ name: 'placeView', params: { placeId: item.placeId } }"
          />
        </v-col>
      </v-row>

      <v-row class="mb-2" v-if="!loading && numberOfPages > 1">
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
import { useLanguage, translations } from "@/composables/useLanguage";
import PlaceCard from "@/modules/places/components/PlaceCard.vue";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { fetchAllPlaces, searchAllPlaces } from "../services/placesApi";

const PAGE_SIZE = 12;
const SEARCH_DEBOUNCE_MS = 300;

const { t, isEnglish } = useLanguage();

const page = ref(1);
const allPlaces = ref([]);
const searchResults = ref(null);
const loading = ref(false);
const error = ref(null);
const sortBy = ref("name");
const filterValue = ref("");
const searchQuery = ref("");
const activeQuery = ref("");

let searchDebounceTimer = null;

const sortOptions = computed(() => [
  { title: t(translations.sortAlphabetical), value: "name" },
  { title: t(translations.sortCommunity), value: "community" },
  { title: t(translations.sortDesignation), value: "designation" },
]);

const showFilter = computed(
  () => sortBy.value === "community" || sortBy.value === "designation"
);

const filterLabel = computed(() =>
  sortBy.value === "community"
    ? t(translations.filterCommunity)
    : t(translations.filterDesignation)
);

const sourcePlaces = computed(() =>
  searchResults.value !== null ? searchResults.value : allPlaces.value
);

const uniqueSortedOptions = (entries, preferEnglish) => {
  const locale = preferEnglish ? "en" : "fr";
  return [...entries.entries()]
    .sort((a, b) => a[1].localeCompare(b[1], locale, { sensitivity: "base" }))
    .map(([value, title]) => ({ title, value }));
};

const filterOptions = computed(() => {
  const preferEnglish = isEnglish.value;
  const allOption = { title: t(translations.filterAll), value: "" };
  const entries = new Map();

  if (sortBy.value === "community") {
    for (const place of sourcePlaces.value) {
      const value = place.communityName || place.localizedLocation(true);
      if (!value || entries.has(value)) continue;
      entries.set(value, place.localizedLocation(preferEnglish) || value);
    }
  } else if (sortBy.value === "designation") {
    for (const place of sourcePlaces.value) {
      const value =
        place.designations?.[0]?.level || place.localizedDesignation(true);
      if (!value || entries.has(value)) continue;
      entries.set(value, place.localizedDesignation(preferEnglish) || value);
    }
  }

  return [allOption, ...uniqueSortedOptions(entries, preferEnglish)];
});

const filteredPlaces = computed(() => {
  const places = sourcePlaces.value;
  if (!filterValue.value || !showFilter.value) return places;

  if (sortBy.value === "community") {
    return places.filter(
      (place) =>
        (place.communityName || place.localizedLocation(true)) ===
        filterValue.value
    );
  }

  if (sortBy.value === "designation") {
    return places.filter(
      (place) =>
        (place.designations?.[0]?.level || place.localizedDesignation(true)) ===
        filterValue.value
    );
  }

  return places;
});

const sortedPlaces = computed(() => {
  const places = [...filteredPlaces.value];
  const preferEnglish = isEnglish.value;

  const compareStrings = (a, b) =>
    a.localeCompare(b, preferEnglish ? "en" : "fr", { sensitivity: "base" });

  places.sort((a, b) => {
    if (sortBy.value === "community") {
      const communityCmp = compareStrings(
        a.localizedLocation(preferEnglish),
        b.localizedLocation(preferEnglish)
      );
      if (communityCmp !== 0) return communityCmp;
      return compareStrings(
        a.localizedName(preferEnglish),
        b.localizedName(preferEnglish)
      );
    }

    if (sortBy.value === "designation") {
      const designationCmp = compareStrings(
        a.localizedDesignation(preferEnglish),
        b.localizedDesignation(preferEnglish)
      );
      if (designationCmp !== 0) return designationCmp;
      return compareStrings(
        a.localizedName(preferEnglish),
        b.localizedName(preferEnglish)
      );
    }

    return compareStrings(
      a.localizedName(preferEnglish),
      b.localizedName(preferEnglish)
    );
  });

  return places;
});

const totalLength = computed(() => sortedPlaces.value.length);
const numberOfPages = computed(() =>
  Math.max(1, Math.ceil(totalLength.value / PAGE_SIZE))
);

const placesList = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE;
  return sortedPlaces.value.slice(start, start + PAGE_SIZE);
});

const photoCountText = computed(() => {
  return totalLength.value ? `(${totalLength.value})` : "(0)";
});

const photoURL = (place) => {
  // Prefer ThumbFile from the register list response (no per-place photos call)
  return place.photoUrl || "";
};

const getDataFromApi = async () => {
  loading.value = true;
  error.value = null;
  try {
    allPlaces.value = await fetchAllPlaces();
    if (activeQuery.value) {
      searchResults.value = await searchAllPlaces(activeQuery.value);
    } else {
      searchResults.value = null;
    }
  } catch {
    // Details are logged by placesApi; show a plain-language message.
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const runSearch = async (query) => {
  loading.value = true;
  error.value = null;
  page.value = 1;
  try {
    if (!query) {
      searchResults.value = null;
      return;
    }
    searchResults.value = await searchAllPlaces(query);
  } catch {
    // Details are logged by placesApi; show a plain-language message.
    error.value = true;
  } finally {
    loading.value = false;
  }
};

watch(sortBy, () => {
  filterValue.value = "";
  page.value = 1;
});

watch(filterValue, () => {
  page.value = 1;
});

watch(numberOfPages, (pages) => {
  if (page.value > pages) {
    page.value = pages;
  }
});

watch(searchQuery, (value) => {
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => {
    const trimmed = (value ?? "").trim();
    if (trimmed === activeQuery.value) return;
    activeQuery.value = trimmed;
    runSearch(trimmed);
  }, SEARCH_DEBOUNCE_MS);
});

// Vuetify's v-select puts role="combobox" on its wrapper div as well as on
// the input, but only gives the input a name. Point the wrapper at the same
// visible label so it is not reported as an unlabelled form control.
const labelSelectWrappers = async () => {
  await nextTick();
  for (const [selectId, labelId] of [
    ["places-sort", "places-sort-label"],
    ["places-filter", "places-filter-label"],
  ]) {
    document
      .getElementById(selectId)
      ?.closest(".v-field")
      ?.setAttribute("aria-labelledby", labelId);
  }
};

watch(showFilter, labelSelectWrappers);

onMounted(() => {
  getDataFromApi();
  labelSelectWrappers();
});

onBeforeUnmount(() => {
  clearTimeout(searchDebounceTimer);
});
</script>

<style scoped>
.v-col {
  transition: all 0.3s ease;
}

.places-list-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.places-sort-controls {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 280px;
}

.places-sort-control {
  width: 100%;
}

.control-label {
  display: block;
  margin-bottom: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
