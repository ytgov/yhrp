import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PLACES_DIR = path.join(__dirname, "places", "en");
const OUTPUT_FILE = path.join(__dirname, "places.json");

// Helper function to get all markdown files
function getAllMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(filePath));
    } else if (file.endsWith(".md") && file !== "README.md") {
      results.push(filePath);
    }
  });
  return results;
}

// Helper function to parse key-value pairs
function parseKeyValuePairs(content) {
  const pairs = {};
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/- \*\*(.*?)\*\*: (.*?)$/);
    if (match) {
      const key = match[1].toLowerCase().replace(/\s+/g, "");
      const value = match[2].trim();
      pairs[key] = value;
    }
  }
  return pairs;
}

// Helper function to parse bulleted lists
function parseBulletedList(content) {
  return content
    .split("\n")
    .filter((line) => line.trim().startsWith("-"))
    .map((line) => line.trim().replace(/^- /, ""));
}

// Helper function to parse subsections
function parseSubsections(content) {
  const subsections = [];
  const parts = content.split("\n### ").filter(Boolean);

  for (const part of parts) {
    const [title, ...content] = part.split("\n");
    const contentText = content.join("\n").trim();

    // Remove ### from title if present
    const cleanTitle = title.replace(/^###\s*/, "").trim();

    // Determine if content is a list or text
    const isList = contentText
      .split("\n")
      .every((line) => !line.trim() || line.trim().startsWith("-"));

    const subsection = {
      title: cleanTitle,
      content: isList ? parseBulletedList(contentText) : contentText,
    };

    subsections.push(subsection);
  }

  return subsections;
}

// Main parser function
function parseMarkdownContent(content) {
  const data = {};

  // Extract name from first heading
  const nameMatch = content.match(/^# (.*?)$/m);
  if (nameMatch) {
    data.name = nameMatch[1];
  }

  // Extract images
  const imageMatches = [...content.matchAll(/!\[(.*?)\]\((.*?)\)/g)];
  if (imageMatches.length > 0) {
    data.images = imageMatches.map((match) => ({
      caption: match[1],
      url: match[2],
    }));
  }

  // Split into sections
  const sections = content.split("\n## ").filter(Boolean);

  for (const section of sections) {
    const [title, ...content] = section.split("\n");
    const sectionName = title.trim().toLowerCase();
    const sectionContent = content.join("\n").trim();

    // Handle special cases for specific sections
    if (sectionName === "overview") {
      const overview = parseKeyValuePairs(sectionContent);
      data.placeId = parseInt(overview.id);
      data.designationLevel = overview.designationlevel;
      data.constructionPeriod = overview.constructionperiod;
      data.location = overview.location;
      if (overview.coordinates) {
        const [lat, lon] = overview.coordinates
          .split(",")
          .map((n) => parseFloat(n.trim()));
        data.coordinates = [lat, lon];
      }
    } else if (sectionName === "designation details") {
      const designation = parseKeyValuePairs(sectionContent);
      const reasonsMatch = sectionContent.match(
        /- \*\*Reasons\*\*:\n([\s\S]*?)(?=^[-#]|$)/m
      );
      data.designations = [
        {
          level: designation.level,
          date: designation.date,
          bylaw: designation.bylaw,
          reasons: reasonsMatch ? parseBulletedList(reasonsMatch[1]) : [],
        },
      ];
    } else if (sectionName === "description") {
      data.description = sectionContent;
    } else if (sectionName === "heritage values") {
      data.heritageValues = parseSubsections(sectionContent);
    } else if (sectionName === "historical sources") {
      data.historicalSources = parseSubsections(sectionContent);
    } else if (sectionName === "cultural history") {
      data.culturalHistory = sectionContent;
    } else if (sectionName === "documentation") {
      const locationMatch = sectionContent.match(/\*\*Location\*\*: (.*?)$/m);
      if (locationMatch) {
        data.documentationLocation = locationMatch[1].trim();
      }
    } else if (sectionName === "sources") {
      data.sources = parseBulletedList(sectionContent);
    }
  }

  return data;
}

function convertMarkdownToJson() {
  const files = getAllMarkdownFiles(PLACES_DIR);

  if (files.length === 0) {
    console.warn(
      `No markdown files found in ${PLACES_DIR}. Please check your directory structure.`
    );
    return;
  }

  console.log(`Found ${files.length} markdown files`);

  const places = files.map((filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const parsed = parseMarkdownContent(fileContent);
    console.log(`Parsed ${path.basename(filePath)}`);
    return parsed;
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(places, null, 2));
  console.log(`Converted ${places.length} markdown files to ${OUTPUT_FILE}`);
}

convertMarkdownToJson();
