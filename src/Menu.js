import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loginContext } from "./App";

const Menu = () => {
  const { state } = useContext(loginContext);
  const [active, setActive] = useState(null);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (state.user.is_MP) {
      setUserType("MP");
    }

    if (state.user.is_insurance) {
      setUserType("Agent");
    }

    if (!state.user.is_MP && !state.user.is_insurance) {
      setUserType("Patient");
    }

  }, [state]);

  return (
    <>
      <div className="sec-menu-container">
        <ul id="myDiv">
          {(() => {
            switch (userType) {
              case "MP":
                return (
                  <div className="menu-ul-list">
                    <li
                      className={"li-font" + ("l1" === active ? " active" : "")}
                      onClick={() => setActive("l1")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/ddashboard"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">home</span> Dashboard
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l2" === active ? " active" : "")}
                      onClick={() => setActive("l2")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/prescribe"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">edit_note</span>{" "}
                        Prescribe
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l3" === active ? " active" : "")}
                      onClick={() => setActive("l3")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/finduser"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">person_search</span>{" "}
                        Find User
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l4" === active ? " active" : "")}
                      onClick={() => setActive("l4")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/prediction"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">construction</span>{" "}
                        Disease Prediction Tool
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l5" === active ? " active" : "")}
                      onClick={() => setActive("l5")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/patientdetailaccess"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">verified</span> Access
                        Verification Tool
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l6" === active ? " active" : "")}
                      onClick={() => setActive("l6")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/detailaccess"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">fact_check</span>{" "}
                        Patient Detail Access
                      </Link>
                    </li>
                  </div>
                );

              case "Agent":
                return (
                  <div className="menu-ul-list">
                    <li
                      className={"li-font" + ("l1" === active ? " active" : "")}
                      onClick={() => setActive("l1")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/agentdashboard"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">home</span> Dashboard
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l2" === active ? " active" : "")}
                      onClick={() => setActive("l2")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/userrequests"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">home</span> User Requests
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l3" === active ? " active" : "")}
                      onClick={() => setActive("l3")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/enrolluser"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">home</span> Enroll User
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l4" === active ? " active" : "")}
                      onClick={() => setActive("l4")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/enrolleduser"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">home</span> Enrolled User
                      </Link>
                    </li>
                   
                  </div>
                );

              case "Patient":
                return (
                  <div className="menu-ul-list">
                    <li
                      className={"li-font" + ("l1" === active ? " active" : "")}
                      onClick={() => setActive("l1")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/dashboard"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">home</span> Dashboard
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l2" === active ? " active" : "")}
                      onClick={() => setActive("l2")}
                    >
                      <Link
                        className="txt  align-centre"
                        to="/profile"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">person</span> Profile
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l3" === active ? " active" : "")}
                      onClick={() => setActive("l3")}
                    >
                      <Link
                        className="txt  align-centre"
                        to="/insurance"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">history_edu</span>{" "}
                        Insurance
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l4" === active ? " active" : "")}
                      onClick={() => setActive("l4")}
                    >
                      <Link
                        className="txt  align-centre"
                        to="/prescription"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">description</span>{" "}
                        Prescription
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l5" === active ? " active" : "")}
                      onClick={() => setActive("l5")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/doctorslist"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">group</span> Doctors
                        List
                      </Link>
                    </li>

                    <li
                      className={"li-font" + ("l6" === active ? " active" : "")}
                      onClick={() => setActive("l6")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/labreport"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">home</span> Lab Report
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l7" === active ? " active" : "")}
                      onClick={() => setActive("l7")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/enrolledpolicy"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="material-icons">home</span> Enrolled Policy's
                      </Link>
                    </li>
                  </div>
                );

              default:
                return <div>You are a User.</div>;
            }
          })()}
        </ul>
      </div>
    </>
  );
};

export default Menu;
