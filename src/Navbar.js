import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { loginContext } from "./App";

const Navbar = () => {
  const { state, dispatch } = useContext(loginContext);

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
                {state.user.is_MP ? (
                  <>
                    <div className={"menu-dropdown" + (menu ? " active" : "")}>
                      <Link to="/ddashboard" onClick={() => setMenu(!menu)} ><div>Dashboard</div></Link>
                      <Link to="/prescribe" onClick={() => setMenu(!menu)} ><div>Prescribe</div></Link>
                      <Link to="/finduser" onClick={() => setMenu(!menu)} ><div>Find User</div></Link>
                      <Link to="/prediction" onClick={() => setMenu(!menu)} ><div>Disease Prediction Tool</div></Link>
                      <Link to="/patientdetailaccess" onClick={() => setMenu(!menu)} ><div>Access Verification Tool</div></Link>
                      <Link to="/detailaccess" onClick={() => setMenu(!menu)} ><div>Patient Detail Access</div></Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={"menu-dropdown" + (menu ? " active" : "")}>
                      <Link to="/dashboard" onClick={() => setMenu(!menu)}><div>Dashboard</div></Link>
                      <Link to="/profile" onClick={() => setMenu(!menu)}><div>Profile</div></Link>
                      <Link to="/insurance" onClick={() => setMenu(!menu)}><div>Insurance</div></Link>
                      <Link to="/prescription" onClick={() => setMenu(!menu)}><div>Prescription</div></Link>
                      <Link to="/doctorslist" onClick={() => setMenu(!menu)}><div>Doctor's List</div></Link>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <h6 className="align-centre">
                HealHub
              </h6>
            </>
          )}
        </div>

        <div className="nav-list">
          <ul>
            {state.isAuthenticated ? (
              <>
                <div className="nav-logged-ul">
                  <li className="nav-item white">
                    Logged in as:- {state.user.username}
                  </li>

                  <li className="nav-item">
                    <Link to="/">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={logoutHandler}
                      >
                        Logout
                      </button>
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
              <Link to="/"  onClick={handleClick} style={{ textDecoration: "none" }}>
                <div className="">Home</div>
              </Link>
              <Link to="/login"  onClick={handleClick} style={{ textDecoration: "none" }}>
                <div className="">Login</div>
              </Link>
              <Link to="/register"  onClick={handleClick} style={{ textDecoration: "none" }}>
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
