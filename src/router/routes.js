import store from "@/state/store";

export default [
  {
    path: "/",
    name: "Products",
    meta: {
      authRequired: true,
    },
    component: () => import("./views/ecommerce/products"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/account/login"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        if (store.getters["auth/loggedIn"]) {
          next({ name: "Products" });
        } else {
          next();
        }
      },
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("./views/account/register"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        if (store.getters["auth/loggedIn"]) {
          next({ name: "Products" });
        } else {
          next();
        }
      },
    },
  },
  {
    path: "/forgot-password",
    name: "Forgot password",
    component: () => import("./views/account/forgot-password"),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        if (store.getters["auth/loggedIn"]) {
          next({ name: "Products" });
        } else {
          next();
        }
      },
    },
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          store.dispatch("auth/logOut");
        } else {
          store.dispatch("authfack/logout");
        }
        const authRequiredOnPreviousRoute = routeFrom.matched.some((route) =>
          route.push("/login")
        );
        next(
          authRequiredOnPreviousRoute ? { name: "Products" } : { ...routeFrom }
        );
      },
    },
  },
  {
    path: "/404",
    name: "404",
    component: require("./views/utility/404").default,
  },
  {
    path: "*",
    redirect: "404",
  },
  {
    path: "/ecommerce/products",
    name: "Products",
    meta: { authRequired: true },
    component: () => import("./views/ecommerce/products"),
  },
  {
    path: "/ecommerce/product-detail/:id",
    name: "Product Detail",
    meta: { authRequired: true },
    component: () => import("./views/ecommerce/product-detail"),
  },
  {
    path: "/ecommerce/add-product",
    name: "Add Product",
    meta: { authRequired: true },
    component: () => import("./views/ecommerce/add-product"),
  },
  {
    path: "/ui/alerts",
    name: "Alerts",
    meta: {
      authRequired: true,
    },
    component: () => import("./views/ui/alerts"),
  },
  {
    path: "/ui/buttons",
    name: "Buttons",
    meta: {
      authRequired: true,
    },
    component: () => import("./views/ui/buttons"),
  },
  {
    path: "/ui/cards",
    name: "Cards",
    meta: { authRequired: true },
    component: () => import("./views/ui/cards"),
  },
  {
    path: "/ui/carousel",
    name: "Carousel",
    meta: { authRequired: true },
    component: () => import("./views/ui/carousel"),
  },
  {
    path: "/ui/dropdowns",
    name: "Dropdowns",
    meta: { authRequired: true },
    component: () => import("./views/ui/dropdowns"),
  },
  {
    path: "/ui/grid",
    name: "Grid",
    meta: { authRequired: true },
    component: () => import("./views/ui/grid"),
  },
  {
    path: "/ui/modals",
    name: "Modals",
    meta: { authRequired: true },
    component: () => import("./views/ui/modals"),
  },
  {
    path: "/ui/drawer",
    name: "Drawer",
    meta: { authRequired: true },
    component: () => import("./views/ui/drawer"),
  },
  {
    path: "/ui/rangeslider",
    name: "Rangeslider",
    meta: { authRequired: true },
    component: () => import("./views/ui/rangeslider"),
  },
  {
    path: "/ui/progressbars",
    name: "Progressbars",
    meta: { authRequired: true },
    component: () => import("./views/ui/progressbars"),
  },
  {
    path: "/ui/placeholder",
    name: "Placeholder",
    meta: { authRequired: true },
    component: () => import("./views/ui/placeholder"),
  },
  {
    path: "/ui/sweet-alert",
    name: "Sweet-alert",
    meta: { authRequired: true },
    component: () => import("./views/ui/sweet-alert"),
  },
  {
    path: "/ui/tabs-accordions",
    name: "Tabs-accordions",
    meta: { authRequired: true },
    component: () => import("./views/ui/tabs-accordions"),
  },
  {
    path: "/ui/typography",
    name: "Typography",
    meta: { authRequired: true },
    component: () => import("./views/ui/typography"),
  },
  {
    path: "/ui/video",
    name: "Video",
    meta: { authRequired: true },
    component: () => import("./views/ui/video"),
  },
  {
    path: "/ui/general",
    name: "General",
    meta: { authRequired: true },
    component: () => import("./views/ui/general"),
  },
  {
    path: "/ui/colors",
    name: "Colors",
    meta: { authRequired: true },
    component: () => import("./views/ui/colors"),
  },
  {
    path: "/ui/lightbox",
    name: "Lightbox",
    meta: { authRequired: true },
    component: () => import("./views/ui/lightbox"),
  },
  {
    path: "/ui/image-cropper",
    name: "Image Cropper",
    meta: { authRequired: true },
    component: () => import("./views/ui/cropper"),
  },
  {
    path: "/icons/boxicons",
    name: "Boxicons Icon",
    meta: { authRequired: true },
    component: () => import("./views/icons/boxicons"),
  },
  {
    path: "/pages/starter",
    name: "Starter",
    meta: { authRequired: true },
    component: () => import("./views/utility/starter"),
  },
  {
    path: "/pages/timeline",
    name: "Timeline",
    meta: { authRequired: true },
    component: () => import("./views/utility/timeline"),
  },
  {
    path: "/pages/faqs",
    name: "FAQs",
    meta: { authRequired: true },
    component: () => import("./views/utility/faqs"),
  },
  {
    path: "/pages/pricing",
    name: "Pricing",
    meta: { authRequired: true },
    component: () => import("./views/utility/pricing"),
  },
  {
    path: "/pages/404",
    name: "Error-404",
    meta: { authRequired: true },
    component: () => import("./views/utility/404"),
  },
  {
    path: "/pages/500",
    name: "Error-500",
    meta: { authRequired: true },
    component: () => import("./views/utility/500"),
  },
];