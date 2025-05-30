# Release and Feature Management Process

This document outlines our process for managing features and releases in the project. For information about our branching strategy, please refer to [BRANCHING_STRATEGY.md](./BRANCHING_STRATEGY.md).

## Versioning Strategy

We follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html) with the format MAJOR.MINOR.PATCH:

- **MAJOR** version (1.0.0): Breaking changes that require migration
- **MINOR** version (0.2.0): New features that are backwards compatible
- **PATCH** version (0.1.1): Bug fixes and minor improvements

## Feature Development Workflow

For detailed information about branch types and naming conventions, see [BRANCHING_STRATEGY.md](./BRANCHING_STRATEGY.md).

### 1. Starting a New Feature

```bash
# Create and switch to a new feature branch
git checkout -b feature/feature-name

# Example: git checkout -b feature/user-authentication
```

### 2. During Development

- Update the "Unreleased" section in `CHANGELOG.md` with your feature details
- Write tests for new functionality
- Ensure all tests pass before completing the feature
- Keep the feature branch up to date with main:
  ```bash
  git checkout main
  git pull
  git checkout feature/feature-name
  git rebase main
  ```

### 3. Completing a Feature

- Ensure all tests pass
- Update documentation
- Create a pull request to merge into main
- Request code review

## Release Process

### 1. Planning a Release

When features are ready for release:

```bash
# Create a release branch
git checkout -b release/X.Y.Z

# Example: git checkout -b release/0.2.0
```

### 2. Preparing the Release

1. Update `CHANGELOG.md`:

   - Move features from "Unreleased" to the new version section
   - Set the release date
   - Remove any empty sections

2. Ensure all tests pass:

   ```bash
   npm test
   ```

3. Create the release commit:
   ```bash
   git add CHANGELOG.md
   git commit -m "chore: prepare release X.Y.Z"
   ```

### 3. Creating the Release

1. Create and push the version tag:

   ```bash
   git tag -a vX.Y.Z -m "Version X.Y.Z"
   git push origin vX.Y.Z
   ```

2. Create a pull request to merge the release branch into main

3. After merging:
   ```bash
   git checkout main
   git pull
   git tag -a vX.Y.Z -m "Version X.Y.Z"
   git push origin vX.Y.Z
   ```

### 4. Deploying to Production

1. **UAT Testing**

   - Create a pull request to merge the release branch into `uat`
   - Deploy to UAT environment
   - Perform user acceptance testing
   - Document any issues found

2. **Production Deployment**

   - Create a pull request to merge the release branch into `prod`
   - After approval, merge the changes
   - Deploy to production:

     ```bash
     # Build the production image
     docker build -t yhrp-viewer:prod .

     # Run the container
     docker run -p 8222:3000 -e NODE_ENV=production --restart=on-failure yhrp-viewer:prod
     ```

   - Verify the deployment:
     - Check application health
     - Monitor error rates
     - Verify feature functionality
     - Check performance metrics

3. **Post-Deployment**
   - Monitor the application for any issues
   - Document the deployment
   - Update any relevant documentation
   - Archive the release branch

## Branch Naming Conventions

For a complete list of branch types and naming conventions, see [BRANCHING_STRATEGY.md](./BRANCHING_STRATEGY.md).

- Feature branches: `feature/feature-name`
- Release branches: `release/X.Y.Z`
- Hotfix branches: `hotfix/issue-description`

## Commit Message Format

We follow conventional commits format:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding or modifying tests
- `chore:` for maintenance tasks

Example: `feat: add user authentication system`

## Changelog Management

The `CHANGELOG.md` file should be updated:

1. When starting a new feature (in the "Unreleased" section)
2. When preparing a release (moving items to the new version)
3. When fixing bugs (in the "Unreleased" section)

## Release Checklist

Before creating a release, ensure:

- [ ] All tests are passing
- [ ] Documentation is up to date
- [ ] Changelog is properly updated
- [ ] No known critical bugs
- [ ] All features are properly tested
- [ ] Code review is completed
- [ ] Dependencies are up to date
- [ ] Security audit is completed
- [ ] Performance testing is done
- [ ] Browser compatibility is verified

## Package Update Process

### 1. Regular Updates

1. **Check for Updates**

   ```bash
   # Check for outdated packages
   npm outdated

   # Check for security vulnerabilities
   npm audit
   ```

2. **Update Dependencies**

   ```bash
   # Update all packages to latest version
   npm update

   # Or update specific packages
   npm update package-name
   ```

3. **Major Version Updates**
   ```bash
   # Install latest major version
   npm install package-name@latest
   ```

### 2. Security Updates

1. **Handle Security Vulnerabilities**

   ```bash
   # Fix security vulnerabilities
   npm audit fix

   # Force update for major version changes
   npm audit fix --force
   ```

2. **Review Changes**
   - Test the application thoroughly
   - Check for breaking changes
   - Update documentation if needed

### 3. Update Process

1. **Create Update Branch**

   ```bash
   git checkout -b update/dependencies
   ```

2. **Update Dependencies**

   - Update package.json
   - Update package-lock.json
   - Run tests
   - Document changes

3. **Testing**

   - Run all tests
   - Test in development environment
   - Check for compatibility issues

4. **Create Pull Request**
   - Include list of updated packages
   - Document any breaking changes
   - Include test results

### 4. Version Control

1. **Commit Message Format**

   ```
   chore(deps): update dependencies

   - Updated package1 to vX.Y.Z
   - Updated package2 to vA.B.C
   - Fixed security vulnerabilities
   ```

2. **Changelog Updates**
   - Add dependency updates to CHANGELOG.md
   - Include version changes
   - Note any breaking changes

### 5. Emergency Updates

For critical security updates:

1. Create hotfix branch from prod
2. Apply security update
3. Test thoroughly
4. Deploy immediately
5. Document the emergency update
