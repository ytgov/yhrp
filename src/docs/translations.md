# Translations / Localization

The Yukon Register of Historic Places supports **English and French** (bilingual).

## Two Types of Bilingual Content

### 1. API Content (Place Data)

Place descriptions, heritage values, and other content come from the YHIS API with paired fields:

| English Field | French Field |
|---------------|--------------|
| `placeDescriptionEn` | `placeDescriptionFr` |
| `heritageValueEn` | `heritageValueFr` |
| `characterDefEn` | `characterDefFr` |
| `descBoundEn` | `descBoundFr` |
| `additionalInfoEn` | `additionalInfoFr` |

These are managed in the upstream YHIS system - we just display whichever language the user has selected.

### 2. UI Strings (Labels, Buttons, Headings)

UI text is managed in a CSV file that can be shared with translation services.

---

## Translation Files

| File | Purpose |
|------|---------|
| `src/web/src/locales/translations.csv` | Source file - edit this |
| `src/web/src/locales/translations.json` | Generated file - don't edit |
| `src/web/scripts/build-translations.js` | Build script |

---

## Adding New Translations

### Step 1: Edit the CSV

Open `src/web/src/locales/translations.csv` in any text editor or spreadsheet application:

```csv
key,en,fr
# SECTION NAME
existingKey,English text,French text
myNewKey,My new English text,Mon nouveau texte français
```

**CSV Format:**
- First row is the header: `key,en,fr`
- Lines starting with `#` are comments (for organizing sections)
- Values containing commas must be quoted: `"Hello, world"`

### Step 2: Rebuild

The JSON file is regenerated automatically when you run:

```bash
npm run dev      # starts dev server (rebuilds first)
npm run build    # production build (rebuilds first)
```

To rebuild manually:

```bash
cd src/web
npm run build:translations
```

### Step 3: Use in Components

```vue
<template>
  <h1>{{ t(translations.myNewKey) }}</h1>
</template>

<script setup>
import { useLanguage, translations } from "@/composables/useLanguage";

const { t } = useLanguage();
</script>
```

---

## Working with Translation Services

The CSV format makes it easy to work with translators:

1. **Export**: Send them `translations.csv`
2. **They edit**: Translators fill in/update the `fr` column
3. **Import**: Drop the updated CSV back into `src/web/src/locales/`
4. **Rebuild**: Run `npm run build:translations`

The CSV can be opened in:
- Microsoft Excel
- Google Sheets
- LibreOffice Calc
- Any text editor

---

## Language Switching

Users toggle language via the navbar button. The preference is stored in `localStorage` and persists across sessions.

### Using Language State in Components

```vue
<script setup>
import { useLanguage, translations } from "@/composables/useLanguage";

const { t, isEnglish, isFrench, currentLanguage, toggleLanguage } = useLanguage();
</script>

<template>
  <!-- For UI strings -->
  <span>{{ t(translations.home) }}</span>
  
  <!-- For API content with En/Fr fields -->
  <p>{{ isEnglish ? place.placeDescriptionEn : place.placeDescriptionFr }}</p>
  
  <!-- With fallback if one language is missing -->
  <p>{{ isEnglish 
    ? (place.descriptionEn || place.descriptionFr) 
    : (place.descriptionFr || place.descriptionEn) 
  }}</p>
</template>
```

---

## Current Translation Keys

The CSV is organized into these sections:

- **App & Navigation** - `appName`, `home`, `map`, `historicPlaces`, etc.
- **Actions & Buttons** - `viewPlace`, `print`, `search`, etc.
- **Page Titles & Headings** - `listOfHistoricPlaces`, `photoGallery`, etc.
- **Place Detail Sections** - `designation`, `heritageValue`, etc.
- **Status & Feedback** - `loading`, `noPlacesFound`, etc.
- **Home Page Content** - `heroText`, `mapViewDescription`, etc.

See the full list in `src/web/src/locales/translations.csv`.
