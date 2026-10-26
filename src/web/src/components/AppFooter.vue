<template>
  <footer class="app-footer">
    <v-footer color="yg_zinc" class="pa-0 footer-wrapper">
      <v-container fluid class="pa-0">
        <v-row no-gutters align="stretch" class="footer-row">
          <v-col cols="12" md="6" class="footer-left pa-6">
            <img
              :src="logoWhiteSvg"
              height="44"
              alt="Yukon Government"
              class="mb-4"
            />
            <div class="footer-links d-flex flex-column ga-2">
              <a
                v-for="link in footerLinks"
                :key="link.key"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link text-h5"
              >
                {{ link.label }}
              </a>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="footer-right d-flex flex-column">
            <div class="aurora-container flex-grow-1">
              <img :src="auroraSvg" alt="" aria-hidden="true" class="aurora-img" />
            </div>
            <div class="copyright-text pa-4 text-right">
              © {{ currentYear }} {{ t(translations.governmentOfYukon) }}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { useLanguage, translations } from "@/composables/useLanguage";
import logoWhiteSvg from "@/assets/Logo White.svg";
import auroraSvg from "@/assets/Aurora-main.svg";

const { t, isEnglish } = useLanguage();

const currentYear = new Date().getFullYear();

const footerLinks = computed(() => [
  {
    key: "copyright",
    label: t(translations.copyright),
    url: isEnglish.value
      ? "https://yukon.ca/en/copyright"
      : "https://yukon.ca/fr/droit-dauteur",
  },
  {
    key: "disclaimer",
    label: t(translations.disclaimer),
    url: isEnglish.value
      ? "https://yukon.ca/en/disclaimer"
      : "https://yukon.ca/fr/avis-de-non-responsabilite",
  },
  {
    key: "privacy",
    label: t(translations.privacyStatement),
    url: isEnglish.value
      ? "https://yukon.ca/en/privacy-statement"
      : "https://yukon.ca/fr/enonce-de-confidentialite",
  },
]);
</script>

<style scoped>
.app-footer {
  margin-top: auto;
  overflow-x: clip;
}

.footer-wrapper {
  min-height: 200px;
  overflow: visible;
}

.footer-row {
  min-height: 200px;
}

.footer-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 10% !important;
}

.footer-left img {
  display: block;
}

.footer-right {
  position: relative;
  padding-right: 10%;
  justify-content: flex-end;
  align-items: flex-end;
  overflow: visible;
}

.aurora-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.aurora-img {
  position: relative;
  transform: translateX(60%);
  height: auto;
  max-height: 140px;
  width: auto;
  object-fit: contain;
}

.footer-links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-left: 2%;
}

.footer-link {
  color: rgba(255, 255, 255, 0.95);
  text-decoration: underline;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #ffffff;
}

.copyright-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8125rem;
}

@media (max-width: 960px) {
  .footer-wrapper {
    min-height: auto;
  }
  
  .footer-row {
    min-height: auto;
  }
  
  .footer-left {
    padding-left: 24px !important;
    padding-right: 24px !important;
    align-items: flex-start;
  }
  
  .footer-links {
    margin-left: 0;
  }
  
  .footer-link {
    font-size: 1.1rem;
  }
  
  .footer-right {
    min-height: 120px;
    align-items: center;
    padding-right: 0;
  }
  
  .aurora-container {
    justify-content: center;
    overflow: hidden;
  }
  
  .aurora-img {
    max-height: 100px;
    transform: translateX(30%);
  }
  
  .copyright-text {
    text-align: center;
    padding-right: 0;
  }
}

@media (max-width: 600px) {
  .footer-left {
    padding: 20px 16px !important;
  }
  
  .footer-link {
    font-size: 1rem;
  }
  
  .aurora-img {
    max-height: 80px;
  }
}
</style>
