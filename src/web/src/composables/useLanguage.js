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
 * All user-facing UI strings in both English and French.
 * Organized by category for easier maintenance.
 *
 * To add a new translation:
 * 1. Find the appropriate category section below
 * 2. Add your key with { en: "...", fr: "..." }
 * 3. Use it via: t(translations.yourKey)
 */
export const translations = {
  // ============================================
  // APP & NAVIGATION
  // ============================================
  appName: {
    en: "Yukon Register of Historic Places",
    fr: "Répertoire des lieux patrimoniaux du Yukon",
  },
  home: {
    en: "Home",
    fr: "Accueil",
  },
  map: {
    en: "Map",
    fr: "Carte",
  },
  historicPlaces: {
    en: "Historic Places",
    fr: "Lieux patrimoniaux",
  },
  places: {
    en: "Places",
    fr: "Lieux",
  },
  contactUs: {
    en: "Contact Us",
    fr: "Contactez-nous",
  },

  // ============================================
  // ACTIONS & BUTTONS
  // ============================================
  viewPlace: {
    en: "View Place",
    fr: "Voir le lieu",
  },
  viewDetails: {
    en: "View Details",
    fr: "Voir les détails",
  },
  viewMap: {
    en: "View Map",
    fr: "Voir la carte",
  },
  viewList: {
    en: "View List",
    fr: "Voir la liste",
  },
  search: {
    en: "Search",
    fr: "Rechercher",
  },
  searchPlaces: {
    en: "Search Places",
    fr: "Rechercher des lieux",
  },
  print: {
    en: "Print",
    fr: "Imprimer",
  },

  // ============================================
  // PAGE TITLES & HEADINGS
  // ============================================
  listOfHistoricPlaces: {
    en: "List of Historic Places",
    fr: "Liste des lieux patrimoniaux",
  },
  mapView: {
    en: "Map View",
    fr: "Vue carte",
  },
  listView: {
    en: "List View",
    fr: "Vue liste",
  },
  exploreHistoricPlaces: {
    en: "Explore Historic Places",
    fr: "Explorez les lieux patrimoniaux",
  },
  photoGallery: {
    en: "Photo Gallery",
    fr: "Galerie photos",
  },

  // ============================================
  // PLACE DETAIL SECTIONS
  // (Labels for expansion panels and data fields)
  // ============================================
  designation: {
    en: "Designation",
    fr: "Désignation",
  },
  placeDescription: {
    en: "Place Description",
    fr: "Description du lieu",
  },
  heritageValue: {
    en: "Heritage Value",
    fr: "Valeur patrimoniale",
  },
  characterDefinition: {
    en: "Character Definition",
    fr: "Définition du caractère",
  },
  additionalInformation: {
    en: "Additional Information",
    fr: "Informations supplémentaires",
  },
  descriptionOfBoundaries: {
    en: "Description of Boundaries",
    fr: "Description des limites",
  },
  level: {
    en: "Level",
    fr: "Niveau",
  },
  date: {
    en: "Date",
    fr: "Date",
  },

  // ============================================
  // STATUS & FEEDBACK MESSAGES
  // ============================================
  loading: {
    en: "Loading",
    fr: "Chargement",
  },
  noPhotosAvailable: {
    en: "No photos available",
    fr: "Aucune photo disponible",
  },
  noPlacesFound: {
    en: "No places found",
    fr: "Aucun lieu trouvé",
  },

  // ============================================
  // HOME PAGE CONTENT
  // ============================================
  heroText: {
    en: "Historic places in the Yukon are a tangible record of the people, events and activities that have shaped our way of life and our environment.",
    fr: "Les lieux patrimoniaux du Yukon sont un témoignage tangible des personnes, des événements et des activités qui ont façonné notre mode de vie et notre environnement.",
  },
  heroSubtext1: {
    en: "Our historic places represent the technologies, designs and ideas that are the framework of our society and the basis for our future.",
    fr: "Nos lieux patrimoniaux représentent les technologies, les designs et les idées qui constituent le cadre de notre société et la base de notre avenir.",
  },
  heroSubtext2: {
    en: "Many places are landmarks within a community, are associated with remarkable people or historical events, or are places that have cultural, social, scientific or architectural significance.",
    fr: "De nombreux lieux sont des points de repère au sein d'une communauté, sont associés à des personnes remarquables ou à des événements historiques, ou sont des lieux qui ont une importance culturelle, sociale, scientifique ou architecturale.",
  },
  heroSubtext3: {
    en: "The Register is an online resource of Yukon's historic places that have been designated as historically significant on a municipal, territorial or national level. You can explore Yukon's history by searching our website for historic places by location on a map, in a list or via name.",
    fr: "Le Répertoire est une ressource en ligne des lieux patrimoniaux du Yukon qui ont été désignés comme historiquement significatifs à l'échelle municipale, territoriale ou nationale. Vous pouvez explorer l'histoire du Yukon en recherchant des lieux patrimoniaux par emplacement sur une carte, dans une liste ou par nom.",
  },
  mapViewDescription: {
    en: "Explore historic places on an interactive map. Find locations near you and discover their historical significance.",
    fr: "Explorez les lieux patrimoniaux sur une carte interactive. Trouvez des emplacements près de chez vous et découvrez leur importance historique.",
  },
  listViewDescription: {
    en: "Browse through our comprehensive list of historic places. Filter and search to find specific locations or types of sites.",
    fr: "Parcourez notre liste complète de lieux patrimoniaux. Filtrez et recherchez pour trouver des emplacements spécifiques ou des types de sites.",
  },
  searchDescription: {
    en: "Search for specific historic places by name, location, or historical significance.",
    fr: "Recherchez des lieux patrimoniaux spécifiques par nom, emplacement ou importance historique.",
  },
};
