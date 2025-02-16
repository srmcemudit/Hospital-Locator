import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import secret from "../secret.json";
function Login() {
  const navigate = useNavigate();
  const googleLogin = async (credentialResponse) => {
    try {
      const tokenResponse = await axios.post(
        "https://oauth2.googleapis.com/token",
        {
          code: credentialResponse.code,
          client_id: secret.web.client_id,
          client_secret: secret.web.client_secret,
          redirect_uri: window.location.origin,
          grant_type: "authorization_code",
        }
      );

      const accessToken = tokenResponse.data.access_token;
      const userInfoResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userData = userInfoResponse.data;
      localStorage.setItem("userData", JSON.stringify(userData));
      if (userData) {
        navigate("/location");
      }
    } catch (error) {
      console.error("error in catch", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: googleLogin,
    onError: googleLogin,
    flow: "authcode",
  });

  return (
    <>
      <div>
        <button onClick={login}>
          login with google
        </button>
      </div>
    </>
  );
}

export default Login;
