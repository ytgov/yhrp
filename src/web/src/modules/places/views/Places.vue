<template>
  <div class="places-list">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="places-list-header">
            <h1 class="text-h4 mb-0">
              {{ t(translations.listOfHistoricPlaces) }} {{ photoCountText }}
            </h1>
            <div class="places-sort-controls">
              <div class="places-sort-control">
                <v-select
                  v-model="sortBy"
                  :items="sortOptions"
                  :label="t(translations.sortBy)"
                  density="compact"
                  hide-details
                />
              </div>
              <div v-if="showFilter" class="places-sort-control">
                <v-select
                  v-model="filterValue"
                  :items="filterOptions"
                  :label="filterLabel"
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
            {{ error }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row v-else-if="placesList.length === 0">
        <v-col cols="12" class="text-center">
          <v-alert type="info" class="mt-4">{{ t(translations.noPlacesFound) }}</v-alert>
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
            @click="handleClick(item)"
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
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { fetchAllPlaces } from "../services/placesApi";

const PAGE_SIZE = 12;

const { t, isEnglish } = useLanguage();

const router = useRouter();

const page = ref(1);
const allPlaces = ref([]);
const loading = ref(false);
const error = ref(null);
const sortBy = ref("name");
const filterValue = ref("");

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
    for (const place of allPlaces.value) {
      const value = place.communityName || place.localizedLocation(true);
      if (!value || entries.has(value)) continue;
      entries.set(value, place.localizedLocation(preferEnglish) || value);
    }
  } else if (sortBy.value === "designation") {
    for (const place of allPlaces.value) {
      const value =
        place.designations?.[0]?.level || place.localizedDesignation(true);
      if (!value || entries.has(value)) continue;
      entries.set(value, place.localizedDesignation(preferEnglish) || value);
    }
  }

  return [allOption, ...uniqueSortedOptions(entries, preferEnglish)];
});

const filteredPlaces = computed(() => {
  const places = allPlaces.value;
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

const handleClick = (place) => {
  router.push({
    name: "placeView",
    params: { placeId: place.placeId },
  });
};

const getDataFromApi = async () => {
  loading.value = true;
  error.value = null;
  try {
    allPlaces.value = await fetchAllPlaces();
  } catch (err) {
    error.value = err.message;
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

onMounted(() => {
  getDataFromApi();
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
</style>
