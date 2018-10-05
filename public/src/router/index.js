/**
 * @author EmmanuelOlaojo
 * @since 12/23/17
 */

import Vue from "vue";
import Router from "vue-router";

import Home from "../components/site/home.vue";

import Admin from "../components/Admin/admin.vue";
import AdminHome from "../components/admin/home/home.admin.vue";
import AdminBlog from "../components/admin/blog/blog.vue";
import AdminExtBlog from "../components/admin/ext_blog/ext";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {path: "/", component: Home},
    {
      path: "/admin",
      component: Admin,
      children: [
        {
          path: "",
          component: AdminHome
        },
        {
          path: "blog",
          component: AdminBlog
        },
        {
          path: "ext",
          component: AdminExtBlog
        }
      ]
    },
    {path: "*", component: Home}
  ]
});
