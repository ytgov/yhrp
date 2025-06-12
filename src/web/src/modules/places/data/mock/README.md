# Mock Data System for Places Module

This directory contains the mock data system for the Places module. It allows you to create and maintain mock data for development and testing purposes.

## Directory Structure

```
mock/
├── places/              # Markdown files for each place
│   └── en/             # English versions of place descriptions
├── images/             # Images for places
│   └── places/        # Place-specific images
├── places.json        # Generated JSON data
├── convert-markdown.js # Script to convert markdown to JSON
└── setup-mock-data.js # Script to set up the mock data structure
```

## Getting Started

1. Run the setup script to create the necessary directory structure:

   ```bash
   node setup-mock-data.js
   ```

2. Add markdown files for each place in the `places/en` directory. Use the sample file as a template.

3. Add images for each place in the `images/places` directory.

4. Run the conversion script to generate the JSON data:
   ```bash
   node convert-markdown.js
   ```

## Markdown Format

Each place should be described in a markdown file with the following sections:

```markdown
# Place Name

![Image Caption](/images/places/image-name.jpg)

## Overview

- **ID**: [number]
- **Designation Level**: [level]
- **Construction Period**: [period]
- **Location**: [location]
- **Coordinates**: [latitude], [longitude]

## Designation Details

- **Level**: [level]
- **Date**: [date]
- **Bylaw**: [bylaw number]
- **Reasons**:
  - [reason 1]
  - [reason 2]

## Description

[Full description text]

## Heritage Values

### [Section Title]

- [item 1]
- [item 2]

## Historical Sources

### [Source Collection]

- [source 1]
- [source 2]

## Cultural History

[History text]

## Documentation

**Location**: [location]

## Sources

- [source 1]
- [source 2]
```

## Using Mock Data

To use the mock data in development:

1. Import the mock data in your component:

   ```javascript
   import mockPlaces from "../data/mock/places.json";
   ```

2. Use it in place of the API call:
   ```javascript
   const places = mockPlaces;
   ```

## Adding New Places

1. Create a new markdown file in `places/en` following the format above
2. Add any images to `images/places`
3. Run `convert-markdown.js` to update the JSON file

## Notes

- The mock data system is designed to mirror the structure of the real API
- Images should be placed in the `images/places` directory and referenced in markdown files
- The conversion script will automatically handle image paths and data structure
