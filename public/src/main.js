/* eslint-disable no-undef */
import Vue from "vue";
import VueResource from "vue-resource";
import Vuex from "vuex";

import App from "./App.vue";
import router from "./router";
import config from "./config";
import status from "../../utils/HttpStats";

Vue.use(VueResource);
Vue.use(Vuex);

Vue.http.interceptors.push((request, next) => {
  let token = localStorage.getItem(config.AUTH);

  request.headers.set(config.AUTH_TOKEN, token);

  next(res => {
    if(res.status === status.UNAUTHORIZED){
      store.commit("clearToken");
    }
  });
});

let store = new Vuex.Store({
  state: {
    token: null,
    showEditor: false
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
      if(state.token){
        localStorage.removeItem(config.AUTH);
        state.token = "";
      }
    },

    showEditor(state){
      state.showEditor = true;
    },

    hideEditor(state){
      state.showEditor = false;
    }
  }
});

const FONT_SIZE = "25px";

$("body").css({
  transition: "font-size 0.2s ease-in-out"
});

new Vue({
  el: "#app",
  template: "<App/>"
  , components: {App}
  , methods: {
    setFontSize(){
      let $body = $("body");

      $body.css({fontSize: FONT_SIZE});
    }
  }
  , created(){
    let self = this;
    let $window = $(window);

    self.setFontSize();
    $window.resize(self.setFontSize);
  }
  , router
  , store
});
