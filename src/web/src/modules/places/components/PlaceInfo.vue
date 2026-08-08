<template>
  <div class="place-info">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="tabs-card">
          <v-tabs
            v-model="activeTab"
            direction="vertical"
            color="primary"
            class="vertical-tabs"
          >
            <v-tab value="designation" class="tab-item">
              <v-icon start>mdi-certificate</v-icon>
              <span class="tab-text">Designation</span>
            </v-tab>
            <v-tab value="description" class="tab-item">
              <v-icon start>mdi-text-box</v-icon>
              <span class="tab-text">Description</span>
            </v-tab>
            <v-tab value="heritage" class="tab-item">
              <v-icon start>mdi-account-group</v-icon>
              <span class="tab-text">Heritage Value</span>
            </v-tab>
            <v-tab value="sources" class="tab-item">
              <v-icon start>mdi-book-open-page-variant</v-icon>
              <span class="tab-text">Historical Sources</span>
            </v-tab>
          </v-tabs>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-window v-model="activeTab" class="content-window">
          <!-- Designation Tab -->
          <v-window-item value="designation">
            <PlaceDesignation :designations="place.designations" />
          </v-window-item>

          <!-- Description Tab -->
          <v-window-item value="description">
            <div class="content-section">
              <h3 class="text-h6 mb-4">Place Description</h3>
              <div class="description-content">
                {{ place.description }}
              </div>
            </div>
          </v-window-item>

          <!-- Heritage Value Tab -->
          <v-window-item value="heritage">
            <div class="content-section">
              <h3 class="text-h6 mb-4">Heritage Value</h3>
              <div class="heritage-value-content">
                <div class="mb-4">{{ place.heritageValueEn }}</div>

                <!-- Character Defining Elements -->
                <div v-if="place.heritageValues.length > 0" class="mb-4">
                  <div class="text-subtitle-1 font-weight-bold mb-2">
                    Character Defining Elements
                  </div>
                  <ul>
                    <li
                      v-for="(item, index) in place.heritageValues[0].items"
                      :key="index"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>

                <!-- Cultural History -->
                <div v-if="place.culturalHistory" class="mb-4">
                  <div class="text-subtitle-1 font-weight-bold mb-2">
                    Cultural History
                  </div>
                  <div>{{ place.culturalHistory }}</div>
                </div>
              </div>
            </div>
          </v-window-item>

          <!-- Historical Sources Tab -->
          <v-window-item value="sources">
            <div class="content-section">
              <h3 class="text-h6 mb-4">Historical Sources</h3>
              <div class="sources-list">
                <div
                  v-for="(source, index) in place.historicalSources"
                  :key="index"
                  class="source-item mb-4"
                >
                  {{ source }}
                </div>
              </div>
            </div>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PlaceDesignation from "./PlaceDesignation.vue";

export default {
  name: "PlaceInfo",
  components: {
    PlaceDesignation,
  },
  props: {
    place: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    activeTab: "designation",
  }),
};
</script>

<style scoped>
.place-info {
  width: 100%;
}

.tabs-card {
  height: 100%;
}

.vertical-tabs {
  height: 100%;
}

.tab-item {
  justify-content: flex-start;
  padding: 12px 16px;
}

.tab-text {
  margin-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content-window {
  height: 100%;
  min-height: 400px;
}

.content-section {
  padding: 24px;
  background-color: rgb(36, 64, 90, 0.05); /* yg_zinc with opacity */
  border-radius: 4px;
  height: 100%;
}

.description-content {
  white-space: pre-line;
}

.heritage-value-content {
  padding: 8px 0;
}

.mb-4 {
  margin-bottom: 16px;
}

.mb-2 {
  margin-bottom: 8px;
}

.sources-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.source-item {
  background-color: white;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.source-content-list {
  list-style-type: disc;
  padding-left: 24px;
  margin: 0;
}

.source-content-item {
  margin-bottom: 8px;
  color: #333;
  line-height: 1.5;
}

@media (max-width: 960px) {
  .tabs-card {
    margin-bottom: 24px;
  }

  .vertical-tabs {
    flex-direction: row !important;
    overflow-x: auto;
  }

  .tab-item {
    min-width: auto;
    padding: 8px 16px;
  }

  .content-section {
    padding: 16px;
  }
}

@media (max-width: 600px) {
  .text-subtitle-1 {
    font-size: 1rem !important;
  }

  .tab-item {
    padding: 8px 12px;
  }

  .source-item {
    padding: 12px;
  }

  .source-content-list {
    padding-left: 20px;
  }
}
</style>
