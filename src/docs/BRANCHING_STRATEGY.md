# Branching Strategy

This document outlines our Git branching strategy and workflow for the project. For information about our release process, please refer to [RELEASE_PROCESS.md](./RELEASE_PROCESS.md).

## Main Branches

- `main` - Primary development branch, always deployable. This serves as our development branch where all feature work is integrated.
- `uat` - User Acceptance Testing branch, for pre-production testing
- `prod` - Production branch, reflects the current production state

## Supporting Branches

1. **Feature Branches**

   - Format: `feature/description-of-feature`
   - Branch from: `main`
   - Merge back into: `main`
   - Naming examples:
     - `feature/map-component-update`
     - `feature/places-search`
     - `feature/user-authentication`

2. **Bugfix Branches**

   - Format: `bugfix/description-of-fix`
   - Branch from: `main`
   - Merge back into: `main`
   - Naming examples:
     - `bugfix/map-loading-issue`
     - `bugfix/search-results-error`

3. **Hotfix Branches**

   - Format: `hotfix/description-of-fix`
   - Branch from: `prod`
   - Merge back into: `prod` and `main`
   - Naming examples:
     - `hotfix/security-patch`
     - `hotfix/critical-api-fix`

4. **Release Branches**
   - Format: `release/vX.Y.Z`
   - Branch from: `main`
   - Merge back into: `main`, `uat`, and `prod`
   - Naming examples:
     - `release/v1.2.0`
     - `release/v2.0.0`
   - For detailed release process, see [RELEASE_PROCESS.md](./RELEASE_PROCESS.md)

## Branch Protection Rules

1. **Main Branch**

   - Requires pull request reviews
   - Requires status checks to pass
   - No direct pushes
   - Must be up to date before merging

2. **UAT Branch**

   - Requires pull request reviews
   - Requires status checks to pass
   - No direct pushes
   - Must be up to date before merging

3. **Production Branch**
   - Requires pull request reviews
   - Requires status checks to pass
   - No direct pushes
   - Must be up to date before merging

## Development Workflow

1. **Starting New Work**

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. **During Development**

   - Commit regularly with clear messages
   - Keep your branch up to date with main

   ```bash
   git checkout main
   git pull origin main
   git checkout feature/your-feature-name
   git merge main
   ```

3. **Completing Work**
   - Create pull request to main
   - Ensure all tests pass
   - Get code review
   - Merge after approval

## Version Control Guidelines

1. **Commit Messages**

   - Use conventional commits format
   - Be clear and descriptive
   - Reference issue numbers when applicable

2. **Pull Requests**

   - Clear title and description
   - Link to related issues
   - Include testing instructions
   - Request appropriate reviewers

3. **Code Review**
   - Review for functionality
   - Check for security issues
   - Ensure code style consistency
   - Verify test coverage

## Cleanup Process

1. **Branch Cleanup**

   - Delete merged feature branches
   - Archive old release branches
   - Clean up stale branches monthly

2. **Dependency Updates**
   - Review and merge Dependabot PRs promptly
   - Test dependency updates thoroughly
   - Keep security updates prioritized

## Emergency Procedures

1. **Hotfix Process**

   - Create hotfix branch from prod
   - Fix the issue
   - Test thoroughly
   - Merge to prod, uat, and main
   - Deploy immediately
   - For detailed emergency release process, see [RELEASE_PROCESS.md](./RELEASE_PROCESS.md)

2. **Rollback Process**
   - Identify last stable version
   - Create rollback branch
   - Revert changes
   - Deploy rollback
   - Document incident
