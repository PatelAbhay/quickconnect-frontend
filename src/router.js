import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Registration from "./views/Registration.vue";
import UserFeed from "./views/UserFeed.vue";
import Inbox from "./views/Inbox.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Registration",
      component: Registration
    },
    {
      path: "/feed",
      name: "UserFeed",
      component: UserFeed
    },
    {
      path: "/inbox",
      name: "Inbox",
      component: Inbox
    },
  ]
});
