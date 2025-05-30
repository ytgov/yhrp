# Repository Cleanup Plan

## Overview

This document outlines the plan for cleaning up and reorganizing the YHRP Site Registry Viewer repository to improve maintainability, documentation, and code organization.

## Phase 1: Documentation Reorganization

- [x] Create new documentation structure:
  ```
  docs/
  ├── architecture/
  │   ├── state-management.md
  │   ├── caching-strategy.md
  │   └── api-schemas/
  │       ├── places-api-schema.md
  │       └── places-data-schema.md
  ├── development/
  │   ├── vue3-migration.md
  │   ├── urls-and-endpoints.md
  │   └── api-consumption.md
  ├── processes/
  │   ├── release-process.md
  │   ├── branching-strategy.md
  │   ├── CHANGELOG_GUIDE.md
  │   └── ARCHIVED_TODOS.md
  └── overview/
      └── application-overview.md
  ```
- [x] Move existing documentation files to new structure
- [x] Update cross-references in documentation
- [x] Remove duplicate CHANGELOG.md (resolved by keeping root CHANGELOG.md and renaming docs version to CHANGELOG_GUIDE.md)
- [x] Review and archive TODO.md items (moved to ARCHIVED_TODOS.md)

## Phase 2: Code Structure Cleanup

- [ ] Consolidate `src/` and `web/` directories
- [ ] Create dedicated `api/` directory
- [ ] Implement consistent naming conventions
- [ ] Move `register-router.ts` from docs to source code
- [ ] Review and clean up any temporary or build files

## Phase 3: Configuration and Build Files

- [ ] Create `docker/` directory
  - [ ] Move Dockerfile
  - [ ] Move docker-compose files
- [ ] Create `config/` directory
  - [ ] Move environment files
  - [ ] Update environment variable documentation
- [ ] Update `.gitignore`
  - [ ] Remove `.DS_Store` files
  - [ ] Add common build artifacts
  - [ ] Add IDE-specific files

## Phase 4: Final Documentation Updates

- [ ] Update README.md with new structure
- [ ] Add contribution guidelines
- [ ] Update deployment instructions
- [ ] Review and update all documentation cross-references

## Final Repository Structure

```
yhrp/
├── docs/           # All documentation
├── src/            # Source code
│   ├── api/        # Backend API
│   └── web/        # Frontend application
├── config/         # Configuration files
├── docker/         # Docker-related files
├── scripts/        # Build and utility scripts
├── tests/          # Test files
├── .gitignore
├── README.md
├── LICENSE
└── package.json
```

## Progress Tracking

- [ ] Phase 1: Documentation Reorganization
- [ ] Phase 2: Code Structure Cleanup
- [ ] Phase 3: Configuration and Build Files
- [ ] Phase 4: Final Documentation Updates

## Notes

- Each phase should be completed and tested before moving to the next
- Changes should be committed after each major task
- Documentation should be updated as changes are made
- All changes should follow the branching strategy outlined in `BRANCHING_STRATEGY.md`
