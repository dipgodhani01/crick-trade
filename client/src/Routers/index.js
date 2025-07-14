import { lazy } from "react";

const RoutesPaths = [
  {
    path: "/",
    component: lazy(() => import("../pages/Home")),
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/login",
    component: lazy(() => import("../auth/GoogleOAuthWrapper")),
    meta: {
      authRoute: false,
    },
  },
  {
    path: "/home",
    component: lazy(() => import("../pages/Home")),
    meta: {
      authRoute: true,
    },
  },


];

export default RoutesPaths;
