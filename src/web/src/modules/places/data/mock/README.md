# Historic Places Mock Data

This directory contains mock data for historic places in Yukon. Each place is represented by a markdown file that follows a specific format, organized by language.

## Folder Structure

```
mock/
├── places/
│   ├── en/           # English markdown files
│   │   ├── smith-house.md
│   │   ├── taylor-house.md
│   │   ├── ...
│   ├── fr/           # French markdown files (optional, for translations)
│   │   ├── (french .md files)
├── images/           # All images referenced in markdown
│   ├── smith-house-1.jpg
│   ├── taylor-house-1.jpg
│   ├── ...
├── convert-markdown.js  # Script to convert markdown to JSON
├── places.json          # Output JSON file
└── README.md            # This documentation
```

## File Format

Each markdown file follows this structure:

```markdown
# [Place Name]

![Image Caption](../../images/[image_file])

## Overview

- **ID**: [id]
- **Designation Level**: [level]
- **Construction Period**: [period]
- **Location**: [location]
- **Coordinates**: [coordinates]

## Designation Details

- **Level**: [level]
- **Date**: [date]
- **Bylaw**: [bylaw]
- **Reasons**:
  - [reason 1]
  - [reason 2]

## Description

[Detailed description of the place]

## Heritage Values

### Character Defining Elements

- [element 1]
- [element 2]

### Boundaries

[Description of boundaries]

## Historical Sources

### [Source Collection Name]

- [source 1]
- [source 2]

## Cultural History

[Detailed cultural history]

## Documentation

**Location**: [documentation location]

## Sources

- [source 1]
- [source 2]
```

## Data Fields

The following fields are extracted from the markdown content:

- `id`: Unique identifier for the place (from Overview section)
- `name`: Full name of the place (from first heading)
- `designationLevel`: Level of heritage designation (from Overview section)
- `constructionPeriod`: Period of construction (from Overview section)
- `location`: Location of the place (from Overview section)
- `coordinates`: [latitude, longitude] (from Overview section)
- `images`: Array of images with url and caption (from markdown image)
- `designations`: Array of designations with:
  - `level`: Designation level
  - `date`: Date of designation
  - `bylaw`: Bylaw number
  - `reasons`: Array of reasons for designation
- `description`: Detailed description of the place
- `heritageValues`: Array of heritage values with:
  - `title`: Section title
  - `items`: Array of items
- `historicalSources`: Array of source collections with:
  - `title`: Collection name
  - `items`: Array of sources
- `culturalHistory`: Detailed cultural history
- `documentationLocation`: Location of documentation
- `sources`: Array of sources

## Usage

The mock data is used in two ways:

1. As human-readable documentation in markdown format
2. As structured data through the `convert-markdown.js` script

To convert the markdown files to JSON:

```bash
node convert-markdown.js
```

This will generate a `places.json` file containing all the structured data from the markdown files in `places/en/` (and, in the future, `places/fr/`).

## Adding New Places or Languages

- To add a new place, create a new markdown file in the appropriate language folder under `places/en/` or `places/fr/`.
- To add a new language, create a new folder under `places/` (e.g., `places/fr/`) and add translated markdown files there.
- All images should be placed in the `images/` directory and referenced in markdown as `../../images/[image_file]`.

## Notes

- Use proper markdown formatting for better readability
- Maintain consistent formatting across all files
- Follow the exact structure for proper data extraction
- Use bold text (`**`) for field labels in Overview and Designation Details sections
- Use proper heading levels (`#` for title, `##` for sections, `###` for subsections)
- Use bullet points (`-`) for lists
