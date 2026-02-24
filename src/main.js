import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./input.css";
import App from "./App.vue";
import StationDjInfoView from "./views/StationDjInfoView.vue";
import PlaylistView from "./views/PlaylistView.vue";
import ConnectedView from "./views/ConnectedView.vue";
import ConnectedImageView from "./views/ConnectedImageView.vue";
import ConnectedBonusView from "./views/ConnectedBonusView.vue";

const routes = [
  { path: "/", redirect: "/flash-fm" },
  { path: "/:station", name: "station-dj", component: StationDjInfoView },
  { path: "/:station/playlist", name: "station-playlist", component: PlaylistView },
  { path: "/:station/connected", name: "station-connected", component: ConnectedView },
  { path: "/:station/connected/view", name: "station-connected-view", component: ConnectedImageView },
  { path: "/:station/connected/bonus", name: "station-connected-bonus", component: ConnectedBonusView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");

