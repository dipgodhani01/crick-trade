import { Suspense } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Router from "./Routers/Router";
import { BrowserRouter } from "react-router-dom";
import Loader from "./components/common/Loader";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          duration: 3500,
        }}
        containerStyle={{
          zIndex: 99999999,
        }}
      />
      <Suspense fallback={<Loader />}>
        <Router />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
