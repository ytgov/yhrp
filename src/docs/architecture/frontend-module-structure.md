# Frontend Module Structure

## Overview

This document outlines the standardized structure for frontend modules in the YHRP Site Registry Viewer. Each module should follow this structure to maintain consistency and improve maintainability.

## Module Structure

```
module-name/
├── components/         # Reusable Vue components specific to this module
│   └── __tests__/     # Component tests
├── data/              # Static data, constants, and types
├── services/          # API and business logic services
│   └── __tests__/     # Service tests
├── router/            # Vue Router configuration
├── views/             # Page-level Vue components
└── README.md          # Module documentation
```

## Directory Purposes

### components/

- Contains reusable Vue components specific to this module
- Components should be focused and single-responsibility
- Include component tests in `__tests__` subdirectory
- Naming convention: `PascalCase.vue`

### data/

- Static data files (e.g., constants, enums, types)
- Module-specific data structures
- Naming convention: `kebab-case.js`

### services/

- API integration services
- Business logic services
- Service tests in `__tests__` subdirectory
- Naming convention: `kebab-case.js`

### router/

- Vue Router configuration
- Route definitions
- Navigation guards
- Naming convention: `index.js`

### views/

- Page-level Vue components
- One-to-one mapping with routes
- Naming convention: `PascalCase.vue`

## Implementation Plan

### 1. Map Module

Current structure is mostly aligned with the standard. Required changes:

- Add README.md
- Move `Migration Tasks.md` content to README.md
- Ensure consistent naming in all directories

### 2. Places Module

Current structure needs updates:

- Remove empty `migration` directory
- Add `services` directory for API integration
- Add README.md
- Ensure consistent naming in all directories

### 3. Home Module

Current structure needs updates:

- Remove empty `store` directory
- Add `data` and `services` directories
- Add README.md
- Ensure consistent naming in all directories

## Naming Conventions

### Files

- Vue Components: `PascalCase.vue`
- JavaScript Files: `kebab-case.js`
- Test Files: `kebab-case.test.js`

### Components

- Component Names: `PascalCase`
- Component Files: `PascalCase.vue`
- Component Tests: `PascalCase.test.js`

### Services

- Service Names: `kebab-case`
- Service Files: `kebab-case.js`
- Service Tests: `kebab-case.test.js`

## Documentation

Each module should include a README.md file with:

- Module purpose and responsibilities
- Key components and their roles
- API integration points
- Dependencies
- Setup instructions
