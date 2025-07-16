import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../utils/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const res = await googleAuth(authResult["code"]);
        const { name, email, image } = res.data.user;
        const token = res.data.token;
        const obj = { name, email, image, token };
        localStorage.setItem("cricktrade-userinfo", JSON.stringify(obj));
        navigate("/home");
      }
    } catch (error) {
      console.log("Error while requesting google code! ", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={googleLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
