import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ExploreView from "@/views/ExploreView";
import RoutinesView from "@/views/RoutinesView";
import LoginView from "@/views/LoginView";
import RoutineDetails from "@/views/RoutineDetails";
import UserView from "@/views/UserView";
import FAQView from "@/views/FAQView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/explore",
    name: "explore",
    component: ExploreView,
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
  },
  {
    path: "/routines",
    name: "routines",
    component: RoutinesView,
  },
  {
    path: "/routines/:id",
    name: "details",
    component: RoutineDetails,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/faq",
    name: "faq",
    component: FAQView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
