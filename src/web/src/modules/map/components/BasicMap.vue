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
import { MAPS_URL } from "@/urls";
import { loadModules } from "esri-loader";
import { useMapService } from "../services/mapService";

export default {
  name: "BasicMap",
  setup() {
    const { bookmarks, loadToken } = useMapService();
    return { bookmarks, loadToken };
  },
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
    photoURL: function (siteID = 607) {
      console.log(siteID);
      //http://register.yukonhistoricplaces.ca/Images/Places/598/1.jpg
      return `http://register.yukonhistoricplaces.ca/Images/Places/${siteID}/1.jpg`;
    },
    showSidebar() {
      this.sidebarVisible = true;
    },
    hideSidebar() {
      this.sidebarVisible = false;
    },
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
                    // sourceURL: this.photoURL(),
                    function(feature) {
                      console.log(feature);
                      return parent.photoURL(
                        feature.graphic.attributes.YHSI_ID
                      );
                    },
                  },
                },
              ],
            },
          ],
          overwriteActions: true,
          actions: [viewSiteAction, viewSiteActionFR],
        };
        var sites = new FeatureLayer({
          url: "https://mapservices.gov.yk.ca/arcgis/rest/services/GeoYukon/GY_CultureHeritage/MapServer/0",
          popupTemplate: YHSIpopup,
          outFields: ["YHSI_ID"],
        });

        new Legend({
          view: view,
          container: "legend",
        });
        new BasemapGallery({
          view: view,
          container: "gallery",
        });

        const bookmarks = this.bookmarks.map((x) => new Bookmark(x));

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
        });

        map.add(sites);
      }
    );
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
