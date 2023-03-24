<template>
  <div style="height: 100%; width: 100%">
    <v-navigation-drawer
      absolute
      temporary
      v-model="sidebarVisible"
      width="400"
    >
      <v-tabs v-model="tab" bg-color="#fff2d5" color="primary">
        <v-tab key="0">Communities</v-tab>
        <v-tab key="1">Basemap</v-tab>
        <v-tab key="2">Legend</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item key="0" eager>
          <div id="bookmarks"></div>
        </v-window-item>
        <v-window-item key="1" eager>
          <div id="gallery"></div>
        </v-window-item>
        <v-window-item key="2" eager>
          <div id="legend"></div>
        </v-window-item>
      </v-window>
    </v-navigation-drawer>

    <div class="map" id="map"></div>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import { MAPS_URL } from "@/urls";
import { mapActions, mapState } from "pinia";
import { useMapStore } from "../stores/MapStore";
export default {
  name: "BasicMap",
  data: () => ({
    view: null,
    sidebarVisible: false,
    tab: null,
    visible: null,
    color: "",
    text: "",
    icon: "",
    map: {},

    baseMapGallery: {},
    layerList: {},
  }),
  methods: {
    ...mapActions(useMapStore, ["loadToken"]),
    showSidebar() {
      this.sidebarVisible = true;
    },
    hideSidebar() {
      this.sidebarVisible = false;
    },
  },
  computed: {
    ...mapState(useMapStore, ["bookmarksSorted"]),
  },
  mounted() {
    let parent = this;
    let resp = {};
    resp.token = this.loadToken;

    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      [
        "esri/Map",
        "esri/identity/IdentityManager",
        "esri/views/MapView",
        "esri/widgets/Search",
        "esri/widgets/Legend",
        "esri/layers/FeatureLayer",
        // "esri/widgets/LayerList",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Bookmarks",
        "esri/webmap/Bookmark",
        "esri/config",
      ],
      { css: true }
    ).then(
      ([
        ArcGISMap,
        IdentityManager,
        MapView,
        Search,
        Legend,
        FeatureLayer,
        // LayerList,
        BasemapGallery,
        Bookmarks,
        Bookmark,
        config,
      ]) => {
        const map = new ArcGISMap({
          basemap: "topo-vector",
        });
        IdentityManager.registerToken({
          server: "https://yukon.maps.arcgis.com",
          token: resp.access_token,
        });
        IdentityManager.registerToken({
          server: `${MAPS_URL}/sites`,
          token: resp.access_token,
        });

        config.request.interceptors.push({
          urls: `${MAPS_URL}/sites`,
          before: function (params) {
            params.requestOptions.withCredentials = true;
          },
        });

        const view = new MapView({
          container: this.$el,
          map: map,
          center: [-135.5, 60.45],
          zoom: 6,
          popup: {
            dockEnabled: true,
            buttonEnabled: false,
          },
        });

        var settingWidget = document.createElement("div");
        settingWidget.title = "Map settings";
        settingWidget.className =
          "esri-icon-drag-horizontal esri-widget--button esri-widget esri-interactive esri-settings";
        settingWidget.addEventListener("click", function () {
          //parent.showSidebar = true;
          parent.showSidebar();
        });

        const searchWidget = new Search({
          view: view,
          includeDefaultSources: false,
          sources: [],
          allPlaceholder: "Search for a site ",
        });

        view.ui.add([
          {
            component: settingWidget,
            position: "manual",
          },
          { component: searchWidget, position: "manual" },
        ]);

        // const featureLayer = new FeatureLayer({
        //   url: "https://mapservices.gov.yk.ca/arcgis/rest/services/GeoYukon/GY_CultureHeritage/MapServer/0",
        // });
        let viewSiteAction = {
          title: "View site details",
          id: "view-site",
          className: "esri-icon-visible",
        };
        let viewSiteActionFR = {
          title: "Regardez les détails du site",
          id: "view-site-fr",
          className: "esri-icon-visible",
        };
        var YHSIpopup = {
          title: "{SITE_NAME}",

          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "YHSI_ID",
                  label: "YHSI ID",
                },
                {
                  fieldName: "SITE_NAME",
                  label: "Site Name",
                },
              ],
            },
            {
              type: "media",
              width: "1000px",
              mediaInfos: [
                {
                  type: "image",
                  value: {
                    sourceURL: "https://picsum.photos/800",
                  },
                },
              ],
            },
          ],

          //removes the default zoom action
          overwriteActions: true,
          actions: [viewSiteAction, viewSiteActionFR],
        };
        var sites = new FeatureLayer({
          url: "https://mapservices.gov.yk.ca/arcgis/rest/services/GeoYukon/GY_CultureHeritage/MapServer/0",
          // url: "http://localhost:3001/api/maps/sites",
          // url: `${MAPS_URL}/sites/0`,
          popupTemplate: YHSIpopup,
          outFields: ["YHSI_ID"],
        });

        // new LayerList({
        //   view: view,
        //   container: "list",
        // });
        new Legend({
          view: view,
          container: "legend",
        });
        new BasemapGallery({
          view: view,
          container: "gallery",
        });

        const bookmarks = parent.bookmarksSorted.map((x) => new Bookmark(x));

        new Bookmarks({
          view: view,
          container: "bookmarks",
          editingEnabled: false,
          bookmarks: bookmarks,
        });

        searchWidget.sources.push({
          layer: sites,
          searchFields: ["YHSI_ID", "SITE_NAME"],
          suggestionTemplate: "{SITE_NAME}",
          exactMatch: false,
          outFields: ["SITE_NAME"],
          name: "Sites",
          placeholder: "example: Mayo Legion Hall",
        });
        view.popup.on("trigger-action", async (event) => {
          if (event.action.id === "view-site") {
            let yhsiId = view.popup.selectedFeature.attributes.YHSI_ID;
            console.log("See site details for " + yhsiId);
            // let results = await parent.searchByYHSIId(yhsiId);
          }
          if (event.action.id === "view-site-fr") {
            let yhsiId = view.popup.selectedFeature.attributes.YHSI_ID;
            console.log("See french site details for " + yhsiId);
            // let results = await parent.searchByYHSIId(yhsiId);
          }
          // if (results.length > 0) {
          //   let item = results[0];
          window.open(`https://google.com`, "_blank");
          // }

          // if (event.action.id === "view-aircrash") {
          //   let id = view.popup.selectedFeature.attributes.YACSI_NUM;
          //   window.open(`/airplane/view/${id}`, "_blank");
          // }
        });

        map.add(sites);
      }
    );
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  },
};
</script>
<style>
.map {
  /* height: 100%;
  width: 100%; */
  border: 1px #ddd solid;
}
.esri-layer-list {
  background-color: white !important;
}
.esri-layer-list__list--root,
.esri-layer-list__item-container {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.esri-search {
  top: 15px;
  right: 55px;
  border: 1px #6e6e6e solid;
  width: 400px !important;
}
.esri-settings {
  top: 15px;
  right: 15px;
  border: 1px #6e6e6e solid;
}
</style>
