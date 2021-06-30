import { useState, useContext, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { urlContext } from "../App";
import otp_img from "../assets/Images/otp_vector.jpg";
import toast from "react-hot-toast";

const OTPScreen = () => {
  const url = useContext(urlContext);

  let history = useHistory();
  const [otp, setOtp] = useState({
    phone_number: localStorage.getItem("phone_number"),
    otp: "",
  });

  const [counter, setCounter] = useState(0);
  let btnRef = useRef();
  const [showResend, setShowResend] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setOtp((prevData) => {
      return { ...prevData, [name]: value };
    });
    console.log({ ...otp });
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    console.log(otp);

    axios
      .post(url + "/api/auth/verify_otp", otp, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        history.push("/login");
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data["detail"]);
      });
  };

  const resendOTP = (event) => {
   
    setCounter((counter) => counter + 1);
    console.log(counter);
    if (counter > 1) {
      if (btnRef.current) {
        btnRef.current.setAttribute("disabled", "disabled");
      }
      toast.error("Kindly try to register with a phone number with network");
    } else {
      toast.success(
        "An OTP has been sent again. Kindly take your phone to a place with good network.",
        {
          duration: 5000,
          icon: "👏",
        }
      );
    }
    // axios
    //   .post(url + "/api/auth/resend_otp", otp, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //     toast.error(error.response.data["detail"]);
    //   });
  };

  return (
    <>
      <div className="auth-inner">
        <p className="bold-300">
          <span className=" material-icons">lock</span>OTP
        </p>

        <form onSubmit={handleSubmit}>
          <div className="align-centre">
            <p className="bold-1 font-small">
              The OTP has been sent to your mobile number.
            </p>
          </div>
          <div className="align-centre">
            <p className="">+91-{otp.phone_number}</p>
          </div>

          <div className="align-centre">
            <img src={otp_img} alt="OTP" height="250px" />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter One Time Password"
              name="otp"
              onChange={onChangeHandler}
            />
          </div>

          <button type="submit" className="btn btn-dark">
            SUBMIT
          </button>
        </form>
        <hr />
        <p>
          Did not recieve OTP ?
          <strong onClick={() => setShowResend(true)}> Click here</strong>
        </p>
        {showResend ? (
          <button
            ref={btnRef}
            className="btn btn-outline-primary"
            onClick={resendOTP}
          >
            Resent OTP
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default OTPScreen;
