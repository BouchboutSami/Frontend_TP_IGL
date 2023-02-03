import React from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from "@react-oauth/google";

const clientId = "131501766158-j4k1h6q02t1acs5qic094vl34jcsbj0n.apps.googleusercontent.com";


function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  var img = "./Showpass.png";

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    
    setShowPassword(!showPassword);
    img = showPassword ?  "./Hidepass.png" :  "./Showpass.png" ; 
  };

  const handleGoogleSuccess = (response) => {
    console.log(response);
    var user = jwt_decode(response.credential);
    setEmail(user.email);
    setPassword(user.sub);
    // Perform any necessary actions with the response, such as sending it to your server for verification and then logging the user in
  };

  const handleGoogleFailure = (response) => {
    console.log(response);
    // Handle errors or failed logins here
  };

  const switchPage = (event) => {};


  return (
    <GoogleOAuthProvider clientId={clientId}>

      <div className="Content font-thin bg-login-bg h-90vh bg-no-repeat bg-cover flex justify-center items-center ">
          <div className="Login bg-IGLbgLogin bg-opacity-90 w-462 h-616 flex justify-center items-center rounded-xl ">
            <form className=" text-IGLblanc p-6 rounded-lg shadow-md font-montserrat items-center justify-center   " >
            <h2 className="text-lg  font-montserrat font-bold  mb-4 text-center">Connexion</h2>
              <label  className="block mb-1 " > 
                Email :
                <input className=" text-black rounded-md h-10 w-full" type="email" placeholder="  xyz@gmail.com" value={email} onChange={handleEmailChange} />
              </label>
              <br />
              <label className="block mb-20">
                Mot de passe: 
                <div className="relative z-0">
                <input className="text-black rounded-md h-10 w-full" placeholder="  votre mot de passe "
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button className="h-6 w-6 absolute inset-y-2 object-right  z-10  right-1  flex items-center  " type="button" onClick={toggleShowPassword}>
                  <img className=" h-6 w-6" src={showPassword ?  "./Hidepass.png" :  "./Showpass.png"} alt="" />
                </button>
                </div>
              </label>
              <br />
              <button className="text-IGLnoir block bg-IGLblanc rounded-md w-full h-10 " type="submit">Se connecter</button>
              <br />
              
              <div className="flex flex-row">
                <hr className="w-16 mr-2 bg-IGLblanc mt-3" />
                <span className="text-IGLblanc " >Ou connectez-vous avec</span>
                <hr className="w-16 ml-2 bg-IGLblanc mt-3" />
              </div>

              <div className="w-full h-10 mt-4 flex justify-center items-center">
                <GoogleLogin
                clientId={clientId}
                buttonText="Connexion"
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                >
                </GoogleLogin>
                  
              </div>

              <div className="mt-8 text-center">
                Vous n’avez pas de compte? <span className="text-IGLorange"> <button onClick={switchPage}>S’inscrire</button> </span>
              </div>
            </form>
          </div>
      </div>
      </GoogleOAuthProvider> 
  );
}

export default Login;
