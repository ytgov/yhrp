import { defineStore } from "pinia";
import axios from "axios";
import { SITES } from "./sites-data";
import { MAPS_URL } from "@/urls";

//This might need to be a secure API call in which case
//import AuthStore from "@/modules/auth/stores/AuthStore";
//and use secureApiCall from "AuthStore"

export const useMapStore = defineStore("maps", {
  state: () => ({
    maps: [],
  }),
  getters: {},
  actions: {
    loadToken() {
      // return axios
      //   .get(`${MAPS_URL}`)
      //   .then((resp) => resp.data)
      //   .catch((err) => {
      //     return { error: err.response.data };
      //   });
      return "somePLaceHolderToken";
    },
    searchByYHSIId(store, id) {
      // return axios
      //   .post(`${PLACE_URL}/search`, {
      //     query: { search: id },
      //     sortBy: [],
      //     page: 1,
      //     itemsPerPage: 20,
      //     groupBy: [],
      //     groupDesc: [],
      //   })
      //   .then((resp) => resp.data.data);
      return SITES;
    },
  },
});
