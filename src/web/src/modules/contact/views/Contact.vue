<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <h1 class="text-h4 mb-4">{{ t(translations.contactUs) }}</h1>
        <p class="text-body-1 mb-6">{{ t(translations.contactIntro) }}</p>

        <div class="d-flex flex-column ga-4">
          <div class="d-flex align-center ga-3">
            <v-icon color="primary" icon="mdi-email" />
            <div>
              <div class="text-subtitle-2 text-grey-darken-1">
                {{ t(translations.contactEmail) }}
              </div>
              <a
                class="text-body-1 text-primary"
                href="mailto:historic.sites@yukon.ca"
              >
                historic.sites@yukon.ca
              </a>
            </div>
          </div>

          <div class="d-flex align-center ga-3">
            <v-icon color="primary" icon="mdi-phone" />
            <div>
              <div class="text-subtitle-2 text-grey-darken-1">
                {{ t(translations.contactPhone) }}
              </div>
              <a class="text-body-1 text-primary" href="tel:+18676675386">
                867-667-5386
              </a>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useLanguage, translations } from "@/composables/useLanguage";

const { t } = useLanguage();
</script>
