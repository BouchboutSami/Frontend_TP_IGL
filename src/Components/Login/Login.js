import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useRef, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import Button from "../DeposerAnnonce/buttonSubmit";
import Hidepass from "./Hidepass.png";
import Showpass from "./Showpass.png";

const clientId =
  "131501766158-j4k1h6q02t1acs5qic094vl34jcsbj0n.apps.googleusercontent.com";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Error, setError] = useState("Entrez vos identifiants");
  const [userConnected, setUserConnected] = useState({});
  const [googleAuth, setGoogleAuth] = useState(false);

  const initialRender = useRef(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSuccess = (response) => {
    var userGoogle = jwt_decode(response.credential);
    setEmail(userGoogle.email);
    setPassword(userGoogle.sub);
    setUsername(userGoogle.name);
    setGoogleAuth(true);
    setError("Connected");
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const user = {
        username: username,
        email: email,
        password: password,
      };
      if (email) {
        axios
          .post("http://localhost:8000/UserExists", user)
          .then((response) => {
            if (response.data) {
              console.log("exist");
              axios
                .post("http://localhost:8000/getUserbyID", user)
                .then((response) => {
                  user.id = response.data[0];
                  console.log(user);
                });
            } else {
              axios
                .post("http://localhost:8000/Signup", user)
                .then((response) => {
                  console.log("insertion");
                  console.log(response.data);
                });
            }
          });
      }
    }
  }, [googleAuth]);

  const handleGoogleFailure = (response) => {
    console.log(response);
    // Handle errors or failed logins here
  };

  const handleSubmit = (event) => {
    const user = {
      username: username,
      email: email,
      password: password,
    };
    axios.post("http://localhost:8000/UserExists", user).then((response) => {
      if (response.data) {
        axios
          .post("http://localhost:8000/getUserbyID", user)
          .then((response) => {
            user.id = response.data[0];
            console.log(user);
            setError("Connected");
          });
      } else {
        setError("Les identifiants ci-dessous sont incorrectes");
      }
    });
  };

  const switchPage = (event) => {};

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="Content font-thin bg-login-bg h-full w-full bg-no-repeat bg-cover flex justify-center items-center ">
        <div className="Login bg-IGLbgLogin bg-opacity-90 w-462 h-616 flex justify-center items-center rounded-xl ">
          <form className=" text-IGLblanc rounded-lg shadow-md font-montserrat flex flex-col items-center justify-center gap-6">
            <h2 className="text-3xl  font-montserrat font-bold  mb-4 text-center">
              Connexion
            </h2>
            {Error.length > 13 ? (
              <p className="text-IGLorange text-sm">{Error}</p>
            ) : (
              <p className="text-[#6ed243] text-sm">{Error}</p>
            )}
            <label className="block mb-1 w-full">
              Email :
              <input
                className=" text-black rounded-md h-10 w-full pl-3"
                type="email"
                placeholder="Votre adresse mail"
                value={email}
                onChange={handleEmailChange}
              />
            </label>
            <label className="block mb-5 w-full">
              Mot de passe:
              <div className="relative z-0">
                <input
                  className="text-black rounded-md h-10 w-full px-3"
                  placeholder="Votre mot de passe"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  className="h-6 w-6 absolute inset-y-2 object-right  z-10  right-2  flex items-center  "
                  type="button"
                  onClick={toggleShowPassword}
                >
                  <img
                    className="h-full w-full"
                    src={showPassword ? Hidepass : Showpass}
                    alt=""
                  />
                </button>
              </div>
            </label>
            <Button
              Submit={handleSubmit}
              text="Se connecter"
              className="w-full h-10"
            />

            <div className="flex flex-row">
              <hr className="w-16 mr-2 bg-IGLblanc mt-3" />
              <span className="text-IGLblanc ">Ou connectez-vous avec</span>
              <hr className="w-16 ml-2 bg-IGLblanc mt-3" />
            </div>

            <div className="w-full h-10 flex justify-center items-center">
              <GoogleLogin
                clientId={clientId}
                buttonText="Connexion"
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              ></GoogleLogin>
            </div>

            <div className="text-center">
              Vous n’avez pas de compte?{" "}
              <span className="text-IGLorange">
                {" "}
                <button onClick={switchPage}>S’inscrire</button>{" "}
              </span>
            </div>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
