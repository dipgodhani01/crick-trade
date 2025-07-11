import { lazy } from "react";

const RoutesPaths = [
  {
    path: "/",
    component: lazy(() => import("../pages/Home")),
    meta: {
      authRoute: false,
    },
  },
  {
    path: "/login",
    component: lazy(() => import("../auth/CreateAccount")),
    meta: {
      authRoute: false,
    },
  },
  {
    path: "/home",
    component: lazy(() => import("../pages/Home")),
    meta: {
      authRoute: false,
    },
  },


];

export default RoutesPaths;
