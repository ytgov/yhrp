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

<style scoped>
.loading {
  font-size: 18px;
  color: #979797 !important;
  margin: auto;
  margin-top: 5%;
}
</style>

<style scoped>
/* Custom CSS for the query builder */
.vqb-group-heading {
  display: none;
}
.vqb-custom-component-wrap {
  display: inline-block;
}
.vue-query-builder .vqb-group-body.card-body {
  padding-top: 0;
  padding-right: 1.25rem;
  padding-left: 1.25rem;
  padding-bottom: 1.25rem;
}
.vue-query-builder select.form-control {
  padding: 9px 8px;
  border: 1px solid grey;
  background-color: white;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 4px;
  cursor: pointer;
  appearance: button;
}
.vue-query-builder select.form-control:hover {
  border: 1px solid black;
}
.vue-query-builder input.form-control {
  padding: 9px 8px;
  border: 1px solid grey;
  background-color: white;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 4px;
  line-height: 19px;
}
.vue-query-builder button.btn {
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  background-color: #2196f3;
  border: 1px #2196f3 solid;
  border-radius: 4px;
  color: white;
  letter-spacing: 1.42857px;
  margin-right: 5px;
}
.vue-query-builder button.btn:hover {
  background-color: #42a5f3;
  border: 1px #42a5f3 solid;
}
.vqb-rule {
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: #fff9ea;
  border-color: #ddd;
  padding: 9px 18px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.vue-query-builder .close {
  color: #969696;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0 13px;
}
.vue-query-builder .close:hover {
  color: #6a6a6a;
}
</style>
