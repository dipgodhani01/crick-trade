import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../utils/api";
import { useNavigate } from "react-router-dom";
import googleIcon from "../assets/google_icon.png";

function Login({ setOpenModal }) {
  const navigate = useNavigate();
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        setOpenModal(false);
        await googleAuth(authResult["code"]);
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
    <div className="">
      <div className="flex justify-center items-center">
        <button
          onClick={googleLogin}
          className="px-4 py-1.5 bg-blue-300 text-white rounded hover:bg-blue-700 flex gap-2 items-center text-xl transition-all duration-200"
        >
          <img src={googleIcon} alt="googleIcon" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
