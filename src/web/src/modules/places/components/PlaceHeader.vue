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
          <div class="language-switcher">
            <v-tooltip text="English" location="bottom">
              <template v-slot:activator="{ props }">
                <span
                  v-bind="props"
                  class="text-body-1 font-weight-bold cursor-pointer"
                  :class="{ 'active-lang': currentLang === 'EN' }"
                  @click="handleLangChange('EN')"
                  >EN</span
                >
              </template>
            </v-tooltip>
            <span class="mx-2">|</span>
            <v-tooltip text="Français" location="bottom">
              <template v-slot:activator="{ props }">
                <span
                  v-bind="props"
                  class="text-body-1 font-weight-bold cursor-pointer"
                  :class="{ 'active-lang': currentLang === 'FR' }"
                  @click="handleLangChange('FR')"
                  >FR</span
                >
              </template>
            </v-tooltip>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PlaceHeader",
  props: {
    currentLang: {
      type: String,
      required: true,
      validator: (value) => ["EN", "FR"].includes(value),
    },
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
  methods: {
    handleLangChange(lang) {
      this.$emit("lang-change", lang);
    },
  },
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
