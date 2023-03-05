<template>
  <div>
    <v-app-bar color="white" flat dark>
      <v-toolbar-title class="black--text mr-2">
        List of Historic Places {{ this.filterText }}
        {{ this.photoCountText }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-container grid-list-xs>
      <v-row v-if="!loading">
        <v-col
          v-for="(item, i) in photos"
          :key="`photo-${i}`"
          class="child-flex"
          cols="4"
        >
          <div style="min-height: 48px">{{ item.communityName || "" }}</div>
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card class="mx-auto">
                <v-img
                  :src="item.ThumbFile.base64"
                  :lazy-src="item.ThumbFile.base64"
                  class="white--text align-end"
                  aspect-ratio="1"
                >
                </v-img>

                <v-card-actions>
                  <v-card-subtitle
                    v-if="selectedSorter == 0"
                    v-text="item.primaryName || ''"
                  ></v-card-subtitle>
                  <v-card-subtitle
                    v-else
                    v-text="item.primaryName || ''"
                  ></v-card-subtitle>
                </v-card-actions>

                <v-fade-transition>
                  <v-overlay v-if="hover" absolute color="#036358">
                    <v-btn @click="handleClick(item)">View Place</v-btn>
                  </v-overlay>
                </v-fade-transition>
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
  </div>
</template>
<script>
import { VDataTable } from "vuetify/labs/VDataTable";

export default {
  name: "places",
  components: {
    VDataTable,
  },
  data: () => ({}),
};
</script>
