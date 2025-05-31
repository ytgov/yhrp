# Vue 3 Front End Template for YG Projects

## Map Migration Tasks:

- [x] migrate store defintion from vuex to pinia
- [x] migrate map component to use pinia stores
- [] remove auth guards from router
- [] wire to YHRP API vs ArcGIS Online

## Environment Variables

### ArcGIS Token

The application requires an ArcGIS token for accessing Yukon map services. This token should be provided through environment variables:

1. Create a `.env` file in the root directory:

```bash
VITE_ARCGIS_TOKEN=your_token_here
```

2. For production, set the environment variable in your deployment environment.

The token is used to authenticate with:

- Yukon maps server (`yukon.maps.arcgis.com`)
- Local API endpoints (`${MAPS_URL}/sites`)

Note: Never commit the `.env` file to version control. A `.env.example` file is provided as a template.

## Important Differences from Vue 2

### Vue Migration

[Vue 3](https://v3.vuejs.org/guide/introduction.html) works a little differently than Vue 2. If this is your first Vue 3 app it's probably worth reading the [Vue 3 Migration Guide](https://v3-migration.vuejs.org) - specifically the section on [breaking changes](https://v3-migration.vuejs.org/breaking-changes/).

### IDE Support

Vue 3 recommends using [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) rather than Vetur for IDE support. Volar is a fork of Vetur that is specifically designed for Vue 3. Volar and Vetur are not compatible with each other, so you will need to uninstall or disable Vetur if you have it installed.

### Composition API

To simplify migration and to make the transition easier most module implement [Vue's Options API](https://vuejs.org/guide/introduction.html#api-styles).

Vue 3 supports a new composition API which make supporting large comples apps easier. The [Vue 3 Composition API Guide](https://v3.vuejs.org/guide/composition-api-introduction.html) is a good place to start learning about the new API. The [Vue 3 API Reference](https://v3.vuejs.org/api/) is also a good place to look for specific API details.

### Vite

This template uses Vite for development and HRM. Vite is a new build tool for Vue 3 that is much faster than webpack. Some of the commands are a little different than Vue 2. The [Vite Docs](https://vitejs.dev/guide/) are a good place to start learning about Vite.

## Conversion Todos

- [x] Update to [Vue 3](https://vuejs.org)
- [x] Remove webpack and use [Vite](https://vitejs.dev) instead
- [x] Remove Vuex and add [Pinia](https://pinia.vuejs.org) for state management
- [x] Update [Vue Router](https://router.vuejs.org) for routing
- [x] Import Base components from @/components
- [x] Migrate @/layouts
- [x] Migrate config.js
- [x] Migrate urls.j
- [x] Migrate auth Library to [auth0-vue](https://github.com/auth0/auth0-vue)
- [ ] Configure auth flows for login in App.vue and @/layouts
- [ ] Convert build process to use [Vite](https://vitejs.dev)

## Module Conversion

- [x] API notification
- [x] Login/Logout/User Profile
- [ ] Data table component
- [ ] Map component
- [ ] Health check

## Project Structure

### `/src`

The root of the project. Contains the main app all the various modules, plugins, and components. `@` is an alias for `/src` and is used in the project to make imports easier to read.

### `@/components`

Contains all the base components that are used throughout the project. These can be used into the modules and layouts without a local import

### `@/layouts`

Contains the layouts for the project. These are the main containers for the modules. The layouts are used in the `App.vue` file to load the modules. Layouts define common application layouts such as the header, footer, and sidebars.

### `@/modules`

Contains the modules for the project. These are the main containers for the pages. The modules are used in the layouts to load the pages. Modules define common application modules such as the login, dashboard, and profile.

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
