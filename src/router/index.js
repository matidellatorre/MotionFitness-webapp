import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ExploreView from "@/views/ExploreView";
import FAQView from "@/views/FAQView";
import RoutinesView from "@/views/RoutinesView";
import LoginView from "@/views/LoginView";
import RoutineDetails from "@/views/RoutineDetails";

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
    path: "/faq",
    name: "faq",
    component: FAQView,
  },
  {
    path: "/routines",
    name: "routines",
    component: RoutinesView,
  },
  {
    path: "/routines/details/:id",
    name: "details",
    component: RoutineDetails,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
