import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { urlContext } from "../App";
import registrationimg from "../assets/Images/HEALHUB-ABOUT.png";
import toast from "react-hot-toast";
import validator from "validator";

const DoctorRegisterScreen = () => {
  const url = useContext(urlContext);
  let history = useHistory();

  const [input, setInput] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    is_MP: true,
    is_pharma: false,
    is_insurance: false
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "is_MP" || name === "is_pharma") {
      setInput((prevData) => {
        return { ...prevData, [name]: event.target.checked };
      });
    } else {
      setInput((prevData) => {
        return { ...prevData, [name]: value };
      });
    }
    console.log({ ...input });
  };

  const validatePhoneNumber = (number) => {
    const isValidPhoneNumber = validator.isMobilePhone(number);
    return isValidPhoneNumber;
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    setInput(input);


    if (!validatePhoneNumber(input.phone_number)) {
      toast.error("Phone Number is not valid.");
      return;
    }

    await axios
      .post(url + "/api/auth/register", input, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem(
          "phone_number",
          response.data.user["phone_number"]
        );
        console.log("Registered");
        history.push("/otpscreen");
      })
      .catch((error) => {
        console.log(error.response.data["detail"]);
        toast.error(error.response.data["detail"]);
      });
 
  };

  return (
    <>
      <div className="sec-home-body-container">
        <div className="login-content-inner">
       
          <img className="auth-img" src={registrationimg} alt="#" />
          <div className="auth-inner">
            <form onSubmit={handleSubmit}>
              <h5 className="align-centre roboto-font">
                <span className="material-icons">person_add </span>Doctor's Registeration
              </h5>
              <div className="alert alert-warning" role="alert">
                Kindly avoid registeration, if you are not a Doctor.
              </div>
              <div className="form-group">
                <label className="font-small">Username</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Enter Username"
                  name="username"
                  onChange={onChangeHandler}
                  value={input.username}
                  required
                />
              </div>

              <div className="form-group">
                <label className="font-small">Email</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Enter Email"
                  name="email"
                  onChange={onChangeHandler}
                  value={input.email}
                  required
                />
              </div>

              <div className="form-group">
                <label className="font-small">Phone Number</label>
                <input
                  type=""
                  className="form-control form-control-sm"
                  placeholder="Enter Phone number"
                  name="phone_number"
                  onChange={onChangeHandler}
                  value={input.phone_number}
                  maxLength="10"
                  required
                />
              </div>

              <div className="form-group">
                <label className="font-small">Password</label>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  placeholder="Enter Password"
                  name="password"
                  onChange={onChangeHandler}
                  value={input.password}
                  required
                />
              </div>
              <button type="submit" className="btn btn-dark btn-sm">
                Register
              </button>
                
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorRegisterScreen;
