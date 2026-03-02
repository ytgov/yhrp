<template>
  <div class="fill-height">
    <PlaceHeader :place-name="placeData?.name" @print="handlePrint" />

    <v-container>
      <v-row v-if="loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary" />
        </v-col>
      </v-row>

      <template v-else-if="error">
        <v-row>
          <v-col cols="12" class="text-center">
            <v-alert type="error">{{ error }}</v-alert>
          </v-col>
        </v-row>
      </template>

      <template v-else-if="placeData">
        <v-row>
          <v-col cols="12">
            <h1 class="text-h4 mb-2">{{ placeData.name }}</h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="8">
            <PlaceGallery :place-id="placeId" />
          </v-col>
          <v-col cols="12" md="4">
            <v-card color="grey-lighten-1" :height="mapHeight">
              <PlaceLocationMap
                :latitude="placeData.coordinates[0]"
                :longitude="placeData.coordinates[1]"
                :place-name="placeData.name"
              />
            </v-card>
          </v-col>
        </v-row>

        <v-row v-if="placeDescription">
          <v-col cols="12">
            <p class="text-subtitle-1 mb-4">{{ placeDescription }}</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-expansion-panels multiple>
              <v-expansion-panel v-for="panel in expansionPanels" :key="panel.title">
                <v-expansion-panel-title class="bg-grey-lighten-4">
                  {{ panel.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div style="white-space: pre-line">{{ panel.content }}</div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useDisplay } from "vuetify";
import { useLanguage, translations } from "@/composables/useLanguage";
import PlaceLocationMap from "@/modules/map/components/PlaceLocationMap.vue";
import PlaceGallery from "../components/PlaceGallery.vue";
import PlaceHeader from "../components/PlaceHeader.vue";
import { fetchPlaceById } from "../services/placesApi";

const props = defineProps({
  placeId: {
    type: [String, Number],
    required: true,
  },
});

const { smAndDown } = useDisplay();
const { t, isEnglish } = useLanguage();

const loading = ref(false);
const error = ref(null);
const placeData = ref(null);

const mapHeight = computed(() => (smAndDown.value ? 300 : 500));

const getLocalizedField = (enField, frField) => {
  if (!placeData.value) return "";
  return isEnglish.value
    ? placeData.value[enField] || placeData.value[frField] || ""
    : placeData.value[frField] || placeData.value[enField] || "";
};

const placeDescription = computed(() => {
  if (!placeData.value) return "";
  return getLocalizedField("placeDescriptionEn", "placeDescriptionFr") ||
    (isEnglish.value ? placeData.value.teaserEnglish : placeData.value.teaserFrench) ||
    "";
});

const expansionPanels = computed(() => {
  if (!placeData.value) return [];
  const d = placeData.value.designations?.[0];
  return [
    {
      title: t(translations.designation),
      content: d ? `${t(translations.level)}: ${d.level || ""}\n${t(translations.date)}: ${d.date || ""}` : "",
    },
    { title: t(translations.placeDescription), content: getLocalizedField("placeDescriptionEn", "placeDescriptionFr") },
    { title: t(translations.heritageValue), content: getLocalizedField("heritageValueEn", "heritageValueFr") },
    { title: t(translations.characterDefinition), content: getLocalizedField("characterDefEn", "characterDefFr") },
    { title: t(translations.additionalInformation), content: getLocalizedField("additionalInfoEn", "additionalInfoFr") },
    { title: t(translations.descriptionOfBoundaries), content: getLocalizedField("descBoundEn", "descBoundFr") },
  ].filter((p) => p.content);
});

const fetchPlaceDetails = async () => {
  loading.value = true;
  error.value = null;
  try {
    placeData.value = await fetchPlaceById(props.placeId);
  } catch (err) {
    console.error("Error fetching place details:", err);
    error.value = "Failed to load place details. Please try again later.";
  } finally {
    loading.value = false;
  }
};

const handlePrint = () => window.print();

watch(
  () => props.placeId,
  (newId) => {
    if (newId) fetchPlaceDetails();
  },
  { immediate: true }
);
</script>

