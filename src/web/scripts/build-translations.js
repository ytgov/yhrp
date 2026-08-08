#!/usr/bin/env node
/**
 * Build Translations Script
 *
 * Converts translations.csv to translations.json for use in the app.
 *
 * Usage:
 *   npm run build:translations
 *
 * The CSV file (src/locales/translations.csv) can be:
 * - Edited directly in a spreadsheet application
 * - Shared with translation services
 * - Version controlled for tracking changes
 *
 * CSV Format:
 *   key,en,fr
 *   myLabel,English text,French text
 *
 * Lines starting with # are treated as comments (section headers)
 * and are ignored during parsing.
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV_PATH = join(__dirname, "../src/locales/translations.csv");
const JSON_PATH = join(__dirname, "../src/locales/translations.json");

function parseCSV(content) {
  const lines = content.split("\n").filter((line) => line.trim());
  const translations = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip header row and comment lines
    if (i === 0 || line.startsWith("#")) {
      continue;
    }

    // Parse CSV line (handles quoted values with commas)
    const values = parseCSVLine(line);
    if (values.length >= 3) {
      const [key, en, fr] = values;
      translations[key] = { en, fr };
    }
  }

  return translations;
}

function parseCSVLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

// Main
try {
  console.log("Reading CSV from:", CSV_PATH);
  const csvContent = readFileSync(CSV_PATH, "utf-8");

  const translations = parseCSV(csvContent);
  const keyCount = Object.keys(translations).length;

  console.log(`Parsed ${keyCount} translation keys`);

  const jsonContent = JSON.stringify(translations, null, 2);
  writeFileSync(JSON_PATH, jsonContent);

  console.log("Written JSON to:", JSON_PATH);
  console.log("Done!");
} catch (error) {
  console.error("Error building translations:", error.message);
  process.exit(1);
}
