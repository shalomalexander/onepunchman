import "./App.css";
import UserScreen from "./Screens/UserScreen";
import { useEffect, useState } from "react";
import OnboardingScreen from "./Screens/OnboardingScreen";
import Navbar from "./Navbar";
import React from "react";
import AuthScreen from "./Screens/AuthScreen";
import { Toaster } from "react-hot-toast";

export const loginContext = React.createContext();
const url = "http://127.0.0.1:8000"; //Use this for local
//const url = "https://shalomalexander.pythonanywhere.com"; //Use this for hosted app
export const urlContext = React.createContext(url);

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  user: localStorage.getItem("user") ? localStorage.getItem("user") : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case "REFRESH":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const [verify, setVerify] = useState(true);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) != null) {
      setVerify(JSON.parse(localStorage.getItem("user"))["verified_field"]);
      // console.log(verify);
    }
  }, [state.isAuthenticated, state.user, verify]);

  return (
    <>
      <loginContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <urlContext.Provider value={url}>
          <Navbar />
          <Toaster position="top-center" reverseOrder={true} />

          <div className="sec-body-container">
            
            {verify ? (
              state.isAuthenticated ? (
                <UserScreen />
              ) : (
                <OnboardingScreen />
              )
            ) : (
              <AuthScreen />
            )}
          </div>
        </urlContext.Provider>
      </loginContext.Provider>
    </>
  );
}

export default App;
