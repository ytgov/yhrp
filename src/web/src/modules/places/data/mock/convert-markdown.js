import fs from "fs";
import matter from "gray-matter";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MOCK_DATA_DIR = path.join(__dirname);
const OUTPUT_FILE = path.join(MOCK_DATA_DIR, "places.json");

function convertMarkdownToJson() {
  const files = fs
    .readdirSync(MOCK_DATA_DIR)
    .filter((file) => file.endsWith(".md"));

  const places = files.map((file) => {
    const filePath = path.join(MOCK_DATA_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    return data;
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(places, null, 2));
  console.log(`Converted ${places.length} markdown files to ${OUTPUT_FILE}`);
}

convertMarkdownToJson();
