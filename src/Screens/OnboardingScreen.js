import React from "react";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import DoctorRegisterScreen from "./DoctorRegisterScreen";
import { Switch, Route} from "react-router-dom";
import OTPScreen from "./OTPScreen";
import HomeScreen from "./HomeScreen";
import InsuranceRegisterScreen from "../InsuranceAgent/Pages/InsuranceRegisterScreen";

const OnboardingScreen = () => {
  return (
    <>
 
          <Switch>
            <Route exact path="/" component={HomeScreen}/>
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/doctorregister" component={DoctorRegisterScreen} />
            <Route exact path="/insuranceagentregister" component={InsuranceRegisterScreen} />
            <Route exact path="/otpscreen" component={OTPScreen} />
          </Switch>
  
    </>
  );
};

export default OnboardingScreen;
