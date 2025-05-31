# Repository Cleanup Plan

## Overview

This document outlines the plan for cleaning up and reorganizing the YHRP Site Registry Viewer repository to improve maintainability, documentation, and code organization.

## Phase 1: Documentation Reorganization ✅

- [x] Create new documentation structure
- [x] Move existing documentation files to new structure
- [x] Update cross-references in documentation
- [x] Resolve CHANGELOG.md situation
- [x] Archive TODO.md items

## Phase 2: Code Structure Cleanup

- [x] Move web directory to src
- [x] Update Dockerfile for new structure
- [ ] Frontend Structure (src/web)
  - [x] Review and organize src/web/src structure
    - [x] Evaluate current module organization
      - [x] Keep root-level files (main.js, App.vue, router.js, config.js, urls.js)
      - [x] Remove unused user module
      - [x] Remove empty store directories
      - [x] Remove unused authorization.js
    - [x] Plan feature-based organization
      - [x] Map module (map visualization)
      - [x] Places module (places management)
      - [x] Home module (landing page)
    - [x] Document proposed structure
  - [ ] Implement consistent naming
    - [x] Define naming conventions
    - [ ] Plan file migrations
      - [ ] Map Module
        - [x] Add README.md
        - [x] Move Migration Tasks.md content to README.md
        - [x] Ensure consistent naming in all directories
      - [ ] Places Module
        - [x] Add services directory for API integration
        - [x] Add README.md
        - [x] Ensure consistent naming in all directories
        - [x] Temporarily use mock data while API integration is pending
        - [x] Clean up Places.vue component
        - [ ] Future Work (TODOs)
          - [ ] Complete backend API implementation
          - [x] Convert axios calls to fetch
          - [x] Add proper error handling and loading states
          - [x] Implement proper data fetching with pagination
          - [ ] Re-implement original API functionality:
            - [ ] Image base64 conversion
            - [ ] Proper pagination handling
            - [x] Error handling for API responses
      - [ ] Home Module
        - [ ] Remove empty store directory
        - [ ] Add data and services directories
        - [ ] Add README.md
        - [ ] Ensure consistent naming in all directories
    - [ ] Update import paths
- [ ] Backend Structure (src/api)
  - [ ] Review current structure
    - [ ] Evaluate directory organization
    - [ ] Identify inconsistencies
    - [ ] Plan improvements
  - [ ] Standardize naming
    - [ ] Define naming conventions
    - [ ] Plan file migrations
    - [ ] Update import paths
- [ ] Build and Development
  - [x] Remove .DS_Store files
  - [x] Update .gitignore
  - [ ] Review build artifacts
    - [ ] Audit build outputs
    - [ ] Clean unnecessary files
    - [ ] Document build process
  - [ ] Development scripts
    - [ ] Review current scripts
    - [ ] Add cleanup scripts
    - [ ] Update documentation

## Phase 3: Configuration and Build Files

- [ ] Create `docker/` directory
  - [ ] Move Dockerfile
  - [ ] Move docker-compose files
- [ ] Create `config/` directory
  - [ ] Move environment files
  - [ ] Update environment variable documentation
- [ ] Update build configuration
  - [ ] Review current setup
  - [ ] Plan improvements
  - [ ] Document changes

## Phase 4: Final Documentation Updates

- [ ] Update README.md with new structure
- [ ] Add contribution guidelines
- [ ] Update deployment instructions
- [ ] Review and update all documentation cross-references

## Notes

- Each phase should be completed and tested before moving to the next
- Changes should be committed after each major task
- Documentation should be updated as changes are made
- All changes should follow the branching strategy outlined in `BRANCHING_STRATEGY.md`
