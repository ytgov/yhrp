import { defineStore } from "pinia";
import axios from "axios";
import { MAPS_URL } from "@/urls";
import { communityBookmarks } from "./data/communityBookmarks";

//This might need to be a secure API call in which case
//import AuthStore from "@/modules/auth/stores/AuthStore";
//and use secureApiCall from "AuthStore"

export const useMapStore = defineStore("maps", {
  state: () => ({
    maps: [],
    bookmarksJSON: communityBookmarks,
  }),
  getters: {
    //sort bookmarks by name
    bookmarksSorted(state) {
      return state.bookmarksJSON.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    },
  },
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
