import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Login";

const GoogleOAuthWrapper = () => {
  return (
    <GoogleOAuthProvider clientId="472158839299-gvfqa9mj4933otnldk5t3934pvsq7qpd.apps.googleusercontent.com">
      <Login />
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuthWrapper;
