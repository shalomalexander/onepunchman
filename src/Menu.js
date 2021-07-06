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
      <div className="sec-menu-container" >
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
                        style={{ textDecoration: "none", fontSize:"12px" }}
                      
                      >
                        <span className="material-icons pr-3">home</span> Dashboard
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l2" === active ? " active" : "")}
                      onClick={() => setActive("l2")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/prescribe"
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">edit_note</span>{" "}
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
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">person_search</span>{" "}
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
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">construction</span>{" "}
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
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">verified</span> Access
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
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">fact_check</span>{" "}
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
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">space_dashboard</span> Dashboard
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l2" === active ? " active" : "")}
                      onClick={() => setActive("l2")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/userrequests"
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">announcement</span> User Requests
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l3" === active ? " active" : "")}
                      onClick={() => setActive("l3")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/enrolluser"
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">person_add</span> Enroll User
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l4" === active ? " active" : "")}
                      onClick={() => setActive("l4")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/enrolleduser"
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">people</span> Enrolled User
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
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">home</span> Dashboard
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l2" === active ? " active" : "")}
                      onClick={() => setActive("l2")}
                    >
                      <Link
                        className="txt  align-centre"
                        to="/profile"
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">person</span> Profile
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l3" === active ? " active" : "")}
                      onClick={() => setActive("l3")}
                    >
                      <Link
                        className="txt  align-centre"
                        to="/insurance"
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">history_edu</span>{" "}
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
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">description</span>{" "}
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
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">group</span> Doctors
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
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">receipt</span> Lab Report
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l7" === active ? " active" : "")}
                      onClick={() => setActive("l7")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/enrolledpolicy"
                        style={{ textDecoration: "none", fontSize:"12px" }}
                      >
                        <span className="material-icons pr-3">view_list</span> <div>Enrolled Policy's</div>
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l8" === active ? " active" : "")}
                      onClick={() => setActive("l8")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/insurancerequest"
                        style={{ textDecoration: "none", fontSize:"12px"  }}
                      >
                        <span className="material-icons pr-3">contact_support</span> Insurance Request
                      </Link>
                    </li>
                    <li
                      className={"li-font" + ("l9" === active ? " active" : "")}
                      onClick={() => setActive("l9")}
                    >
                      <Link
                        className="txt align-centre"
                        to="/allergicinfo"
                        style={{ textDecoration: "none", fontSize:"12px" }}
                      >
                        <span className="material-icons pr-3">coronavirus</span> Allergic Information
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
