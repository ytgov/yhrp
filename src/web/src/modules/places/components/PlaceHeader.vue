<template>
  <div class="bg-white border-b">
    <v-container fluid>
      <v-row class="align-center justify-space-between py-2 px-4">
        <v-col cols="auto">
          <v-breadcrumbs :items="breadcrumbItems" divider=">" class="pa-0">
            <template #item="{ item }">
              <v-breadcrumbs-item v-if="item.to" :to="item.to" class="text-body-2">
                {{ item.title }}
              </v-breadcrumbs-item>
              <v-breadcrumbs-item v-else class="text-body-2" aria-current="page">
                {{ item.title }}
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" variant="flat" @click="$emit('print')">
            <v-icon start>mdi-printer</v-icon>
            {{ t(translations.print) }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useLanguage, translations } from "@/composables/useLanguage";

const { t } = useLanguage();

const props = defineProps({
  placeName: {
    type: String,
    default: "",
  },
});

defineEmits(["print"]);

const breadcrumbItems = computed(() => [
  { title: t(translations.home), to: "/" },
  { title: t(translations.places), to: "/places" },
  { title: props.placeName },
]);
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid rgb(var(--v-theme-on-surface), 0.12);
}
</style>
