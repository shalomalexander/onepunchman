import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Profile from "../Pages/Profile";
import Insurance from "../Pages/Insurance";
import Prescription from "../Pages/Prescription";
import Prescribe from "../Pages/Prescribe";
import FindUser from "../Pages/FindUser";
import Menu from "../Menu";
import { loginContext } from "../App";
import ErrorScreen from "./ErrorScreen";
import Prediction from "../Pages/Prediction";
import PatientDetailAccess from "../Pages/PatientDetailAccess";
import AccessById from "../Pages/AccessById";
import AccessByFP from "../Pages/AccessByFP";
import DetailAccess from "../Pages/DetailAccess";
import DDashboard from "../Pages/DDashboard";
import DoctorsList from "../Pages/DoctorsList";
import LabReportUpload from "../Pages/LabReportUpload";
import EnrolledPolicy from "../Pages/EnrolledPolicy";

import AgentDashboard from "../InsuranceAgent/Pages/AgentDashboard";
import EnrollUser from "../InsuranceAgent/Pages/EnrollUser";
import EnrolledUser from "../InsuranceAgent/Pages/EnrolledUser";
import UserRequests from "../InsuranceAgent/Pages/UserRequests";

const UserScreen = () => {
  const { dispatch } = useContext(loginContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(user);
    // console.log(token);
    dispatch({
      type: "REFRESH",
      payload: { user, token },
    });
  }, [dispatch]);

  return (
    <>
      <div className="menu-body-container" id="no-print">
        <Menu />
      </div>
      <div className="content-container">
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/insurance" component={Insurance} />
          <Route exact path="/prescription" component={Prescription} />
          <Route exact path="/labreport" component={LabReportUpload} />
          <Route exact path="/enrolledpolicy" component={EnrolledPolicy} />

          <Route exact path="/prescribe" component={Prescribe} />
          <Route exact path="/finduser" component={FindUser} />
          <Route exact path="/prediction" component={Prediction} />
          <Route
            exact
            path="/patientdetailaccess"
            component={PatientDetailAccess}
          />
          <Route
            exact
            path="/patientdetailaccess/accessbyid"
            component={AccessById}
          />
          <Route
            exact
            path="/patientdetailaccess/accessbyfp"
            component={AccessByFP}
          />
          <Route exact path="/detailaccess" component={DetailAccess} />
          <Route exact path="/ddashboard" component={DDashboard} />
          <Route exact path="/doctorslist" component={DoctorsList} />
          <Route exact path="/error" component={ErrorScreen} />

          <Route exact path="/agentdashboard" component={AgentDashboard} />
          <Route exact path="/enrolluser" component={EnrollUser} />
          <Route exact path="/enrolleduser" component={EnrolledUser} />
          <Route exact path="/userrequests" component={UserRequests} />
        </Switch>
      </div>
    </>
  );
};

export default UserScreen;
