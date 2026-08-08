import { ref } from "vue";

export const useNotificationService = () => {
  const showNotification = ref(false);
  const message = ref({ text: "", variant: "info" });

  const show = (text, variant = "info") => {
    message.value = { text, variant };
    showNotification.value = true;
  };

  const showSuccess = (text) => {
    show(text, "success");
  };

  const showError = (text) => {
    show(text, "error");
  };

  const showAPIMessages = (apiResponse) => {
    if (apiResponse.errors) {
      return showError(apiResponse.errors[0].text);
    }
    if (apiResponse.messages) {
      const message = apiResponse.messages[0];
      if (message.variant === "success") {
        showSuccess(message.text);
      } else if (message.variant === "error") {
        showError(message.text);
      } else {
        show(message.text, message.variant);
      }
      return;
    }
    show("Complete", "primary");
  };

  return {
    showNotification,
    message,
    show,
    showSuccess,
    showError,
    showAPIMessages,
  };
};
