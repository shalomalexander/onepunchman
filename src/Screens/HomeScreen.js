import logo from "../assets/Images/healhub-logo.png";
import home from "../assets/SVG/HEALHUB-HOME.svg";
import about from "../assets/SVG/HEALHUB-ABOUT.svg";
import support from "../assets/SVG/HEALHUB-SUPPORT.svg";
import security from "../assets/SVG/HEALHUB-SECURITY.svg";
import qrcode from "../assets/Images/HEALHUB-QRCODE.png";

import { Link } from "react-router-dom";
import { useState } from "react";

const HomeScreen = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  }

  return (
    <>
      <div className="sec-home-body-container">
        <div className="home-content-inner">
            <div className="healhub-frontline">
              <p className="input-row-1 bold-500">
                HealHub <img className="homelogo" src={logo} alt="#" />
              </p>
              <p className="txt-1">
                Store securely, atmost privacy: Our web based platform is an
                Electronic Health Record Management system, where you can store
                your health data safely.
              </p>
              <div className="register-home-container"> 
                <button onClick={handleClick} className="btn btn-primary home-btn">Register</button>
              
                <div className={"register-dropdown" + (click ? " active" : "")}>
                  <Link to="/register" style={{textDecoration:"none"}}>
                    <div className="hover-li">Patient's Registration</div>
                  </Link>
                  <Link to="/doctorregister" style={{textDecoration:"none"}}>  
                    <div className="hover-li">Doctor's Registration </div>
                  </Link>  
                </div>
              </div>  
            </div>
            <img className="home-1-img" src={home} alt="#" />
        </div>
        <div className="home-content-inner2">
          <div className="home-content-inner2-inner">
            <div className="card text-center" style={{ width: "100%",  backgroundColor: "#212925",
                color: "white" }}>
            <img className="home-1-img" src={about} alt="#" />
              <div className="card-body">
                <h5 className="card-title">What is HealHub?</h5>
                <p className="card-text">
                  HealHub helps to store and maintain the health records of a
                  patient and provides patient the facility to share their
                  medical records with a Doctor at their own ease. Medical
                  emergencies can happen anytime and anywhere. A number of cases
                  has been reported where a fraction of deaths were caused due
                  to the unavailability of the patient’s health record. This
                  platform removes the hassle of physical medical records and
                  provide patient's the facility to store his medical records
                  securely in one place.
                </p>
              </div>
            </div>
           
          </div>
        </div>

        <div className="home-content-inner2">
          <div className="heading">
            <p className="bold-500">
              <span className="icon-size material-icons">
                supervised_user_circle
              </span>
              Stakeholders
            </p>
          </div>
          <div className="home-content-inner2-inner">
            <div
              className="card text-center"
              style={{
                width: "100%",
                backgroundColor: "#212925",
                color: "white",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">Patient's</h5>
                <p className="card-text">
                  A patient is a stakeholder who requires medical care and
                  treatment based on his past medical history. Here, a patient
                  can store and share his medical records safely and securely.
                </p>

                <Link to="/register">
                  <button className="btn btn-primary home-btn">
                    Register as Patient
                  </button>
                </Link>
              </div>
            </div>
            <div
              className="card text-center"
              style={{
                width: "100%",
                backgroundColor: "#212925",
                color: "white",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">Doctor's</h5>
                <p className="card-text">
                  Doctors are the prime stakeholder, who will have utmost
                  benefit from this platform. They will be able to access
                  patient’s health record with ease and will be able to serve
                  their best for the care and treatment of the patient.
                </p>
                <Link to="/doctorregister">
                  <button className="btn btn-primary home-btn">
                    Register as doctor
                  </button>
                </Link>
              </div>
            </div>
           
          </div>
        </div>
        <div className="home-content-inner2">
          <div className="heading">
            <p className="bold-500">
              <span className="icon-size material-icons">security</span>Security
            </p>
          </div>
          <div className="home-content-inner2-inner">
           

            <div
              className="card text-center"
              style={{ width: "100%", margin: "10px",  backgroundColor: "#212925",
              color: "white" }}
            >
               <img className="home-1-img" src={security} alt="#" />
              <div className="card-body">
                <h5 className="card-title">How is your data secure with us?</h5>
                <p className="card-text">
                  Knox provides one token per call to the login view - allowing
                  each client to have its own token which is deleted on the
                  server side when the client logs out.Knox tokens are only
                  stored in an encrypted form. Even if the database were somehow
                  stolen, an attacker would not be able to log in with the
                  stolen credentials.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="home-content-inner2">
          <div className="heading">
            <p className="bold-500">
              <span className="icon-size material-icons">contact_support</span>
              Support
            </p>
          </div>
          <div className="home-content-inner2-inner">
            <div
              className="card text-center"
              style={{
                width: "100%",
                backgroundColor: "#212925",
                color: "white",
              }}
            >
             
              <div className="card-body">
              <img className="home-1-img" src={support} alt="#" />
                <h5 className="card-title">Found a Bug or Issue ?</h5>
                <p className="card-text">
                  We assure customer reliability for our web portal. Support
                  team is available to resolve any issue arose while using the
                  web application. Contact us today at{" "}
                  <strong>healhub0@gmail.com</strong> or leave a Bug/Issue
                  feedback using the form below.
                </p>
                <a
                  href="https://forms.gle/9qK4jrywRds9zuxm9"
                  className="btn btn-primary"
                >
                  Support Form
                </a>
              </div>
            </div>

           
          </div>
        </div>

        <div className="home-content-inner2">
          <div className="heading">
            <p className="bold-500">
              <span className="icon-size material-icons">qr_code_scanner</span>{" "}
              QR-CODE
            </p>
          </div>
          <div className="home-content-inner2-inner">
            <div
              className="card text-center"
              style={{
                width: "100%",
                backgroundColor: "#212925",
                color: "white",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  Scan the <strong>QR-CODE</strong>
                </h5>
                <div className="qr-container">
                  <img className="qrcode" src={qrcode} alt="#" />
                </div>
                <p className="card-text">
                  HealHub is a mobile friendly platform. Now you can access the
                  platform by just scanning this QR-code using your Device. Why
                  not grab your phone and give a try scanning the QR-Code.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="home-content-inner2-footer">
          <div className="home-content-inner2-footer-inner">
            <p className="txt-1 font-small">
              HealHub is developed by @FrozenfireCoders
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
