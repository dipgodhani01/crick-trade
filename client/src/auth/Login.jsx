import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../utils/api";

function Login() {
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        console.log("Result", result.data);
      }
      console.log("authResult", authResult);
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
