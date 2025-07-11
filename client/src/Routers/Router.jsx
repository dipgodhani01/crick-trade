import { Navigate, Route, Routes } from "react-router-dom";
import RoutesPaths from "./index.js";
import PageNotFound from "../pages/PageNotFound.jsx";
import Layout from "../layouts/Layout.jsx";

function Router() {
  const user = true;
  const FinalRoute = (props) => {
    const route = props?.route;
    if (!user) {
      return <Navigate to="/login" />;
    }
    return <route.component {...props} />;
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {RoutesPaths.map((route, index) => {
          return (
            <Route
              exact
              key={index}
              path={route?.path}
              element={<FinalRoute route={route} />}
            />
          );
        })}
        <Route exact path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
export default Router;
