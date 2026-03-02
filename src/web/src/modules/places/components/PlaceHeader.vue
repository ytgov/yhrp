<template>
  <div class="bg-white border-b">
    <v-container fluid>
      <v-row class="align-center justify-space-between py-2 px-4">
        <v-col cols="auto">
          <v-breadcrumbs :items="breadcrumbItems" divider=">" class="pa-0">
            <template #item="{ item }">
              <v-breadcrumbs-item
                :to="item.to"
                :disabled="item.disabled"
                class="text-body-2 text-grey-darken-1"
              >
                {{ item.title }}
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" variant="flat" @click="$emit('print')">
            <v-icon start>mdi-printer</v-icon>
            Print
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  placeName: {
    type: String,
    default: "",
  },
});

defineEmits(["print"]);

const breadcrumbItems = computed(() => [
  { title: "Home", disabled: false, to: "/" },
  { title: "Places", disabled: false, to: "/places" },
  { title: props.placeName, disabled: true },
]);
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid rgb(var(--v-theme-on-surface), 0.12);
}
</style>
