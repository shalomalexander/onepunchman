import { useContext, useEffect, useState } from "react";
import { loginContext, urlContext } from "../App";
import axios from "axios";
import RequestCard from "../components/RequestCard";
import toast from "react-hot-toast";

const AccessById = () => {
  const { state } = useContext(loginContext);
  const url = useContext(urlContext);

  const [id, setID] = useState({
    pid: "",
    did: state.user.id,
  });

  const [names, setNames] = useState([]);

  const [user, setUser] = useState();

  const [otp, setOtp] = useState({
    otp: "",
    pid: "",
    did: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setID((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleOTPInputChange = (event) => {
    const { name, value } = event.target;

    setOtp((prevData) => {
      return { ...prevData, [name]: value };
    });
    setOtp((prevData) => {
      return {
        ...prevData,
        pid: localStorage.getItem("pid"),
        did: state.user.id,
      };
    });
  };

  const handleOTPSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    await axios
      .post(url + "/api/v1/otpaccessverification/", otp, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          // alert(response.data);
          toast.error(`${response.data}`);
        } else if (response.status === 201) {
          // alert("OTP verified");
          toast.success("One Time Password verified.");
        }
      })
      .catch((error) => {
        console.log(error.response);
        // alert("No User Available for this OTP");
        toast.error("OTP is incorrect.");
      });

    console.log(otp);
    
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    let res = names
      .map((name) => name)
      .filter((n) => {
        return parseInt(id.pid) === parseInt(n.id);
      });
    setUser(res);
    if(res.length===0) {
      toast.error("No account exist with this ID.");
    }
    // console.log(res);
  };

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get(url + "/api/auth/userlist");
      //console.log(res.data);
      let temp = res.data
        .map((item) => item)
        .filter((mp) => {
          return mp.is_MP === false;
        });

      setNames(temp);
    };
    fetchData();
  }, [url]);

  return (
    <>
      <div className="">
        <strong style={{ fontSize: "25px"}}>
        Access by Patient's Identity Number
        </strong>
        <p>
          <strong>Note: </strong> When you make a request, An OTP will be
          generated and sent to user's phone number. Enter the One Time Password
          below to get access to patient's data.
        </p>
        <hr />
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="dark-card">
              <div className="form-group col">
                <label>
                  <strong>Patient ID/User ID</strong>
                </label>
                <div className="row align-centre">
                  <div className="col-8">
                    <input
                      type="number"
                      className="form-control"
                    
                      placeholder="Enter Patient ID"
                      name="pid"
                      value={id.pid}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <button type="submit" className="btn btn-primary">
                      Search Patient
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="">
            {user ? (
              user.map((u) => (
                <RequestCard key={u.id} value={u} did={state.user.id} />
              ))
            ) : (
              <div className="">
                <p>
                  <strong>Note:</strong> Currently you have not searched any
                  Patient ID/User ID
                </p>
              </div>
            )}
          </div>
          <hr />
          <form onSubmit={handleOTPSubmit}>
            <div className="dark-card">
              <div className="form-group col">
                <label>
                  <strong>OTP</strong>
                </label>
                <div className="row align-centre">
                  <div className="col-8">
                    <input
                      type="number"
                      className="form-control"
                    
                      placeholder="Enter One Time Password after making request"
                      name="otp"
                      value={otp.otp}
                      onChange={handleOTPInputChange}
                    />
                  </div>
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary">
                      Verify OTP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccessById;
