import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginContext, urlContext } from "./App";
import axios from "axios";
import avatar from "./assets/Images/profile.png";

const Navbar = () => {
  const { state, dispatch } = useContext(loginContext);
  const url = useContext(urlContext);

  const [profile, setProfile] = useState();
  const [userType, setUserType] = useState("");

  const logoutHandler = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const [click, setClick] = useState(false);
  const [menu, setMenu] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (state.user) {
        let response = await axios.get(
          url + "/api/v1/PersonalInfoOfSpecificUser/" + state.user.id
        );
        //console.log(response.data);
        setProfile(response.data.profilePicture);
      }
    };
    fetchData();

    if (state.user && state.user.is_MP) {
      setUserType("MP");
    }

    if (state.user && state.user.is_insurance) {
      setUserType("Agent");
    }

    if (state.user && !state.user.is_MP && !state.user.is_insurance) {
      setUserType("Patient");
    }

    return () => {
      setProfile();
    };
  }, [url, state]);

  return (
    <>
      <div className="nav-container">
        <div className="white nav-logo">
          {state.isAuthenticated ? (
            <>
              <h6 className="align-centre poppins-font logo">
                <span className="material-icons">health_and_safety</span>HealHub
              </h6>
              <div className="burger-menu-list">
                <button
                  onClick={() => setMenu(!menu)}
                  className="burger-menu-button"
                >
                  <span className="material-icons">menu</span>
                </button>
                {(() => {
                  switch (userType) {
                    case "MP":
                      return (
                        <>
                          <div
                            className={
                              "menu-dropdown" + (menu ? " active" : "")
                            }
                          >
                            <Link
                              to="/ddashboard"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Dashboard</div>
                            </Link>
                            <Link
                              to="/prescribe"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Prescribe</div>
                            </Link>
                            <Link
                              to="/finduser"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Find User</div>
                            </Link>
                            <Link
                              to="/prediction"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Disease Prediction Tool</div>
                            </Link>
                            <Link
                              to="/patientdetailaccess"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Access Verification Tool</div>
                            </Link>
                            <Link
                              to="/detailaccess"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Patient Detail Access</div>
                            </Link>
                          </div>
                        </>
                      );
                    case "Agent":
                      return (
                        <>
                          <div
                            className={
                              "menu-dropdown" + (menu ? " active" : "")
                            }
                          >
                            <Link
                              to="/agentdashboard"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Dashboard</div>
                            </Link>
                            <Link
                              to="/userrequests"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>User Requests</div>
                            </Link>
                            <Link
                              to="/enrolluser"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Enroll</div>
                            </Link>
                            <Link
                              to="/enrolleduser"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Enrolled User</div>
                            </Link>
                          </div>
                        </>
                      );
                    case "Patient":
                      return (
                        <>
                          <div
                            className={
                              "menu-dropdown" + (menu ? " active" : "")
                            }
                          >
                            <Link
                              to="/dashboard"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Dashboard</div>
                            </Link>
                            <Link
                              to="/profile"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Profile</div>
                            </Link>
                            <Link
                              to="/insurance"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Insurance</div>
                            </Link>
                            <Link
                              to="/prescription"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Prescription</div>
                            </Link>
                            <Link
                              to="/doctorslist"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Doctor's List</div>
                            </Link>

                            <Link
                              to="/labreport"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Lab Reports</div>
                            </Link>
                            <Link
                              to="/enrolledpolicy"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Enrolled Policy's</div>
                            </Link>
                            <Link
                              to="/insurancerequest"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Insurance Request</div>
                            </Link>
                            <Link
                              to="/allergicinfo"
                              onClick={() => setMenu(!menu)}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Allergic Information</div>
                            </Link>
                          </div>
                        </>
                      );
                    default:
                      return <></>;
                  }
                })()}
                
              </div>
            </>
          ) : (
            <>
              <h6 className="align-centre">HealHub</h6>
            </>
          )}
        </div>

        <div className="nav-list">
          <ul>
            {state.isAuthenticated ? (
              <>
                <div className="nav-logged-ul">
                  <li className="nav-item white px-3">{state.user.username}</li>
                  {profile ? (
                    <div>
                      <img
                        src={profile}
                        alt="Avatar"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "100px",
                          marginRight: "10px",
                          border: "white 2px solid",
                        }}
                      />
                      <div
                        style={{
                          position: "relative",
                          width: "10px",
                          height: "10px",
                          backgroundColor: "#66DE93",
                          borderRadius: "50px",
                          top: "-10px",
                          border: "white 2px solid",
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div>
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="avatar"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "100px",
                          marginRight: "10px",
                          border: "white 2px solid",
                        }}
                      />
                      <div
                        style={{
                          position: "relative",
                          width: "10px",
                          height: "10px",
                          backgroundColor: "#66DE93",
                          borderRadius: "50px",
                          top: "-10px",
                          border: "white 2px solid",
                        }}
                      ></div>
                    </div>
                  )}

                  <li className="nav-item">
                    <Link
                      to="/"
                      className="btn btn-outline-primary btn-sm"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Link>
                  </li>
                </div>
              </>
            ) : (
              <>
                <div className="nav-ul">
                  <li className="nav-item">
                    <Link
                      className="txt align-centre"
                      to="/"
                      style={{ textDecoration: "none" }}
                    >
                      <span className="material-icons">home</span> Home
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className="txt align-centre"
                      to="/login"
                      style={{ textDecoration: "none" }}
                    >
                      <span className="material-icons">login</span> Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="txt align-centre"
                      to="/register"
                      style={{ textDecoration: "none" }}
                    >
                      <span className="material-icons">person_add </span>
                      Register
                    </Link>
                  </li>
                </div>
              </>
            )}
          </ul>
        </div>
        {state.isAuthenticated ? (
          <></>
        ) : (
          <div className="burger-list">
            <button onClick={handleClick} className="burger-button">
              <span className="material-icons">menu</span>
            </button>
            <div className={"dropdown" + (click ? " active" : "")}>
              <Link
                to="/"
                onClick={handleClick}
                style={{ textDecoration: "none" }}
              >
                <div className="">Home</div>
              </Link>
              <Link
                to="/login"
                onClick={handleClick}
                style={{ textDecoration: "none" }}
              >
                <div className="">Login</div>
              </Link>
              <Link
                to="/register"
                onClick={handleClick}
                style={{ textDecoration: "none" }}
              >
                <div className="">Register</div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
