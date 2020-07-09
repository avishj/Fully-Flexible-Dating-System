import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/Profile.vue";
import Timetable from "../views/Timetable.vue";
import Verify from "../views/Verify.vue";
import ResendVerify from "../views/ResendVerify.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { requiresAuth: false }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: "/timetable",
    name: "Timetable",
    component: Timetable,
    meta: { requiresAuth: false }
  },
  {
    path: "/verify",
    name: "Verify",
    component: Verify,
    meta: { requiresAuth: false }
  },
  {
    path: "/resend-verify",
    name: "ResendVerify",
    component: ResendVerify,
    meta: { requiresAuth: false }
  },
  {
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // Check if user is authenticated or not
    // eslint-disable-next-line no-constant-condition
    if (true) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
