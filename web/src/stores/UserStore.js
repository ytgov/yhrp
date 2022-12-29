import { defineStore, getActivePinia } from "pinia";

import { useNotificationStore } from "@/stores/NotificationStore";
import { useApiStore } from "@/stores/ApiStore";

let m = useNotificationStore();

function waitSomeSeconds(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      display_name: " ",
      email: "",
      roles: [""],
      ynet_id: "",
    },
  }),
  getters: {
    userRoles(state) {
      return state.user.roles;
    },
    isAdmin(state) {
      return state.user.roles.includes("System Administrator");
    },
  },
  actions: {
    async initialize() {
      console.log("Initializing user store...");
      await waitSomeSeconds(1);
      //go and get user details
      this.user = {
        display_name: "Avery Lewis ",
        email: "avery.lewise@yukon.ca",
        roles: ["System Administrator"],
        ynet_id: "alewis",
      };

      console.log("Initialized user store");
    },
    toggleAdmin() {
      if (this.isAdmin) {
        this.user.roles = this.user.roles.filter(
          (role) => role !== "System Administrator"
        );
        this.user.roles.push("User");
      } else {
        this.user.roles = this.user.roles.filter((role) => role !== "User");
        this.user.roles.push("System Administrator");
      }

      let message = {
        status_code: 200,
        text: "Changed role to " + this.user.roles,
        icon: "mdi-information",
        variant: "success",
      };
      m.notify(message);
    },
    async getRoles() {
      console.log("getting roles");

      let api = useApiStore();
      api.secureCall("get", "api/roles");
    },
  },
});
