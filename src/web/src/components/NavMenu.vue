<template>
  <v-menu activator="parent" offset-y class="ml-0">
    <v-list>
      <v-list-item to="/">
        <template v-slot:prepend>
          <v-icon>mdi-home</v-icon>
        </template>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-item to="/map">
        <template v-slot:prepend>
          <v-icon>mdi-map-outline</v-icon>
        </template>
        <v-list-item-title>Map</v-list-item-title>
      </v-list-item>

      <v-list-item to="/places">
        <template v-slot:prepend>
          <v-icon>mdi-information-outline</v-icon>
        </template>
        <v-list-item-title>Historic Places</v-list-item-title>
      </v-list-item>

      <v-divider />
      <v-list-item>
        <template v-slot:prepend>
          <v-icon>mdi-email</v-icon>
        </template>
        <v-list-item-title>Contact Us</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "NavMenu",
};
</script>
