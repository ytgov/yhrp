<template>
  <v-menu activator="parent">
    <v-list>
      <v-list-item to="/" prepend-icon="mdi-home" title="Home" />
      <v-list-item to="/map" prepend-icon="mdi-map-outline" title="Map" />
      <v-list-item to="/places" prepend-icon="mdi-information-outline" title="Historic Places" />
      <v-divider />
      <v-list-item prepend-icon="mdi-email" title="Contact Us" />
    </v-list>
  </v-menu>
</template>

<script setup></script>
