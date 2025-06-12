<template>
  <div class="place-header">
    <v-container fluid>
      <v-row justify="space-between" align="center" class="header-row">
        <v-col cols="auto">
          <v-breadcrumbs
            :items="breadcrumbItems"
            divider=">"
            class="text-grey-darken-1"
          >
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item
                :to="item.to"
                :disabled="item.disabled"
                class="text-body-2"
              >
                {{ item.title }}
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
        </v-col>
        <v-col cols="auto">
          <v-btn
            class="button mx-1"
            @click="$emit('print')"
            color="primary"
            variant="flat"
          >
            <v-icon left>mdi-printer</v-icon>
            <span class="ml-2">Print</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PlaceHeader",
  props: {
    placeName: {
      type: String,
      default: "",
    },
  },
  computed: {
    breadcrumbItems() {
      return [
        {
          title: "Home",
          disabled: false,
          to: "/",
        },
        {
          title: "Places",
          disabled: false,
          to: "/places",
        },
        {
          title: this.placeName,
          disabled: true,
        },
      ];
    },
  },
  methods: {},
};
</script>

<style scoped>
.place-header {
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
}

.header-row {
  min-height: 44px;
  padding: 0 16px;
}

.cursor-pointer {
  cursor: pointer;
}

.active-lang {
  color: #0097a9;
}

.language-switcher {
  height: 100%;
  display: flex;
  align-items: center;
}

@media (max-width: 600px) {
  .header-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .language-switcher {
    margin-top: 8px;
  }
}
</style>
