import { useState, useContext, useEffect } from "react";
import { loginContext, urlContext } from "../../App";
import toast from "react-hot-toast";
import axios from "axios";

const EnrollUser = (props) => {
  const [data, setData] = useState({
    userId: props.location.state ? props.location.state.user_id : "",
    agentId: "",
    validTill: "",
    policyProvider: "",
    policyName: "",
    policyNumber: "",
  });

  const [active, setActive] = useState(false);

  const url = useContext(urlContext);
  const { state } = useContext(loginContext);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    axios
      .post(url + "/api/v1/enrollinsurance/", data)
      .then((res) => {
        // console.log(res);
        toast.success("Successfully Enrolled User");
      })
      .catch((error) => {
        console.log(error);
      });

    //console.log(data);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setData((prevData) => {
      return { ...prevData, [name]: value, agentId: state.user.id };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = null;
      try {
        response = await axios.get(
          url + `/api/v1/insuranceagent/` + state.user.id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Token " + state.token,
            },
          }
        );
        //console.log(response.data["activeIndicator"]);
        if (response.data["activeIndicator"].toString() === "Y") {
          setActive(true);
        }
        // setActive(response.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchData();
  }, [url, state]);

  return (
    <>
      <div className="content-inner">
        <p className="bold-300">Enroll User</p>
        <hr />
        {active ? (
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Insurance Valid Till</label>
                <input
                  type="date"
                  className="form-control"
                  id=""
                  name="validTill"
                  value={data.validTill}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Policy Provider</label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  placeholder="Policy Provider"
                  name="policyProvider"
                  value={data.policyProvider}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-sm-6">
                <label>Policy Name</label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  placeholder="Policy Name"
                  name="policyName"
                  value={data.policyName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-sm-6">
                <label>Policy Number</label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  placeholder="Policy Number"
                  name="policyNumber"
                  value={data.policyNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>User ID</label>
                <input
                  type="number"
                  className="form-control"
                  id=""
                  placeholder=""
                  name="userId"
                  value={data.userId}
                  onChange={handleInputChange}
                />
                <small id="" className="text-muted">
                  Enter the user id of user to whom you are prescribing. User
                  can get their user id from their Dashboard
                </small>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Enroll User
            </button>
          </form>
        ) : (
          <>
            <div className="alert alert-warning" role="alert">
              You are not a verified Insurance Provider. Kindly contact your admin to verify your details.
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EnrollUser;
