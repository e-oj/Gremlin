/* eslint-disable no-undef */
import Vue from "vue";
import VueResource from "vue-resource";
import Vuex from "vuex";

import App from "./App.vue";
import router from "./router";
import config from "./config";

Vue.use(VueResource);
Vue.use(Vuex);

Vue.http.interceptors.push((request, next) => {
  let token = localStorage.getItem(config.AUTH);

  request.headers.set(config.AUTH_TOKEN, token);
  next();
});

let store = new Vuex.Store({
  state: {
    token: null
  },

  getters: {
    /**
     * @param state store state
     * @returns boolean login state
     */
    loggedIn(state){
      return !!state.token;
    }
  },

  mutations: {
    /**
     * Sets the value of token in the store
     * and localStorage
     *
     * @param state
     * @param token
     */
    token(state, token){
      localStorage.setItem(config.AUTH, token);
      state.token = token;
    },

    /**
     * Clears the auth token from localStorage
     * and in the store.
     *
     * @param state
     */
    clearToken(state){
      localStorage.removeItem(config.AUTH);
      state.token = "";
    }
  }
});

new Vue({
  el: "#app",
  template: "<App/>"
  , components: {App}
  , created(){
    const FONT_RATIO = 0.013;
    let fontSize = (window.screen.availWidth * FONT_RATIO) + "px";
    let $body = $("body");

    $body.css({fontSize});

    console.log(fontSize);
  }
  , router
  , store
});
