<template>
  <v-snackbar
    v-model="showNotification"
    location="bottom right"
    :color="prettyMessage(message).color"
  >
    <v-icon class="mr-3">{{ prettyMessage(message).icon }}</v-icon>
    {{ message.text }}
  </v-snackbar>
</template>

<script>
import { useNotificationService } from "@/services/notificationService";

export default {
  name: "NotificationDisplay",
  setup() {
    const { showNotification, message } = useNotificationService();
    return { showNotification, message };
  },
  methods: {
    prettyMessage(message) {
      if (message.variant === "success") {
        return {
          color: "green",
          icon: "mdi-check",
          text: message.text,
        };
      } else if (message.variant === "error") {
        return {
          color: "red",
          icon: "mdi-cancel",
          text: message.text,
        };
      } else {
        return {
          color: message.variant,
          icon: "mdi-information",
          text: message.text,
        };
      }
    },
  },
};
</script>
