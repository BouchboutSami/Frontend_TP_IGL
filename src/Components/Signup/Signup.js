import { React, useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Button from "../DeposerAnnonce/buttonSubmit";
import Hidepass from "../Login/Hidepass.png";
import Showpass from "../Login/Showpass.png";
import axios from "axios";

const clientId =
  "131501766158-j4k1h6q02t1acs5qic094vl34jcsbj0n.apps.googleusercontent.com";

const Signup = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Error, setError] = useState(
    "Vérifiez votre Adresse mail et/ou Mot de passe"
  );
  const [userConnected, setUserConnected] = useState({});

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

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
    let userGoogle = jwt_decode(response.credential);
    setUsername(userGoogle.name);
    setEmail(userGoogle.email);
    setPassword(userGoogle.sub);
  };

  const handleGoogleFailure = (response) => {
    console.error(response);
  };

  const onSubmit = () => {
    if (Error === "Vérifiez votre Adresse mail et/ou Mot de passe") {
      console.log("hello");
      // on insere pas
    } else {
      const user = {
        username: username,
        email: email,
        password: password,
        isadmin: 0,
      };
      axios.post("http://localhost:8000/UserExists", user).then((response) => {
        if (response.data) {
          setError("Adresse Mail déja Existante ! (Se connecter)");
        } else {
          axios.post("http://localhost:8000/Signup", user).then((response) => {
            console.log(response.data);
            setUserConnected(response.data);
          });
        }
      });
    }
  };

  useEffect(() => {
    if (
      !email.includes("@") ||
      !(password.length > 6) ||
      username.length === 0 ||
      email.length < 6
    ) {
      setError("Vérifiez votre Adresse mail et/ou Mot de passe");
    } else {
      setError("Valid format");
    }
  }, [username, email, password]);

  useEffect(() => {
    if (Object.keys(userConnected).length !== 0) {
      console.log("hello");
      props.onLogin(userConnected);
      const user = userConnected;
      navigate("/", { state: { user } });
    }
  }, [userConnected]);

  const switchPage = () => {
    navigate("/login");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="Content font-thin bg-login-bg h-screen w-full bg-no-repeat bg-cover flex justify-center items-center ">
        <div className="Login bg-IGLbgLogin bg-opacity-90 w-462 h-616 flex justify-center items-center rounded-xl ">
          <form className=" text-IGLblanc p-6 rounded-lg shadow-md font-montserrat flex flex-col items-center justify-center  gap-4">
            <h2 className="text-3xl  font-montserrat font-bold  mb-4 text-center">
              Inscription
            </h2>
            {Error.length > 13 ? (
              <p className="text-IGLorange text-sm text-center">{Error}</p>
            ) : (
              <p className="text-[#6ed243] text-sm">Valid format</p>
            )}
            <label className="block w-full">
              Nom d'utilisateur :
              <input
                className=" text-black rounded-md h-10 w-full pl-3 outline-none"
                type="text"
                onChange={handleUsernameChange}
                placeholder="Votre nom d'utilisateur"
                value={username}
              />
            </label>
            <label className="block w-full">
              Email :
              <input
                className=" text-black rounded-md h-10 w-full pl-3 outline-none"
                type="email"
                placeholder="Votre adresse mail"
                value={email}
                onChange={handleEmailChange}
              />
            </label>
            <label className="block w-full mb-4">
              Mot de passe:
              <div className="relative z-0">
                <input
                  className="text-black rounded-md h-10 w-full px-3 outline-none"
                  placeholder="Votre mot de passe "
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
                    className="h-6 w-6"
                    src={showPassword ? Hidepass : Showpass}
                    alt=""
                  />
                </button>
              </div>
            </label>
            <Button
              Submit={onSubmit}
              text="S'inscrire"
              className="w-full h-10"
            />
            <div className="flex flex-row">
              <hr className="w-16 mr-2 bg-IGLblanc mt-3" />
              <span className="text-IGLblanc ">Ou inscrivez-vous avec</span>
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
              Vous avez un compte?{" "}
              <span className="text-IGLorange">
                {" "}
                <button onClick={switchPage}>Se connecter</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
