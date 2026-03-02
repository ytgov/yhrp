/**
 * Language/Localization Composable
 *
 * This application supports English and French (bilingual).
 *
 * == HOW LOCALIZATION WORKS ==
 *
 * 1. UI STRINGS (buttons, labels, menu items):
 *    - Defined in the `translations` object at the bottom of this file
 *    - Each key has { en: "English text", fr: "French text" }
 *    - Used via: t(translations.keyName)
 *
 * 2. API CONTENT (place descriptions, heritage values, etc.):
 *    - The YHIS API returns paired fields: *En and *Fr suffixes
 *    - Example: placeDescriptionEn, placeDescriptionFr
 *    - Components use isEnglish/isFrench to pick the right field
 *
 * == ADDING NEW UI LABELS ==
 *
 * 1. Add a new entry to the `translations` object:
 *
 *    myNewLabel: {
 *      en: "English text here",
 *      fr: "French text here",
 *    },
 *
 * 2. Use it in your component:
 *
 *    import { useLanguage, translations } from "@/composables/useLanguage";
 *    const { t } = useLanguage();
 *
 *    // In template:
 *    {{ t(translations.myNewLabel) }}
 *
 * == USING API BILINGUAL CONTENT ==
 *
 * For content from the API with *En/*Fr field pairs:
 *
 *    import { useLanguage } from "@/composables/useLanguage";
 *    const { isEnglish } = useLanguage();
 *
 *    // In template or computed:
 *    {{ isEnglish ? place.placeDescriptionEn : place.placeDescriptionFr }}
 *
 *    // Or with fallback:
 *    const description = computed(() =>
 *      isEnglish.value
 *        ? place.placeDescriptionEn || place.placeDescriptionFr
 *        : place.placeDescriptionFr || place.placeDescriptionEn
 *    );
 */

import { computed, ref, watch } from "vue";

const STORAGE_KEY = "yhrp-language";
const SUPPORTED_LANGUAGES = ["en", "fr"];

const currentLanguage = ref(localStorage.getItem(STORAGE_KEY) || "en");

watch(currentLanguage, (lang) => {
  localStorage.setItem(STORAGE_KEY, lang);
});

/**
 * Composable for managing language state and translations
 *
 * @returns {Object} Language utilities
 * @returns {Ref<string>} currentLanguage - Current language code ("en" or "fr")
 * @returns {ComputedRef<boolean>} isEnglish - True if current language is English
 * @returns {ComputedRef<boolean>} isFrench - True if current language is French
 * @returns {Function} setLanguage - Set language to specific code
 * @returns {Function} toggleLanguage - Toggle between English and French
 * @returns {Function} t - Translate a key from translations object
 */
export function useLanguage() {
  const isEnglish = computed(() => currentLanguage.value === "en");
  const isFrench = computed(() => currentLanguage.value === "fr");

  const setLanguage = (lang) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      currentLanguage.value = lang;
    }
  };

  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === "en" ? "fr" : "en";
  };

  /**
   * Get translated string for current language
   * @param {Object} translationObj - Object with { en: string, fr: string }
   * @returns {string} Translated string (falls back to English if French missing)
   */
  const t = (translationObj) => {
    return translationObj[currentLanguage.value] || translationObj.en || "";
  };

  return {
    currentLanguage,
    isEnglish,
    isFrench,
    setLanguage,
    toggleLanguage,
    t,
  };
}

/**
 * UI Translations
 *
 * Loaded from src/locales/translations.json (generated from translations.csv)
 *
 * To add a new translation:
 * 1. Edit src/locales/translations.csv
 * 2. Run: npm run build:translations
 * 3. Use it via: t(translations.yourKey)
 *
 * The CSV file can be shared with translation services for professional translation.
 */
export { default as translations } from "@/locales/translations.json";
