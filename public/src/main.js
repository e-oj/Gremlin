import Vue from "vue";
import VueResource from "vue-resource";

import App from "./App.vue";
import router from "./router";
import config from "./config";

Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
  let token = localStorage.getItem(config.AUTH);

  request.headers.set(config.AUTH_TOKEN, token);
  next();
});

new Vue({
  el: "#app",
  template: "<App/>"
  , components: {App}
  , router
});
