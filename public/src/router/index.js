/**
 * @author EmmanuelOlaojo
 * @since 12/23/17
 */

import Vue from "vue";
import Router from "vue-router";

import Home from "../components/home.vue";
import Admin from "../components/admin.vue";

Vue.use(Router);

export default new Router({
  mode: "history"
  , routes: [
    {path: "/", component: Home}
    , {path: "/admin", component: Admin}
  ]
});
