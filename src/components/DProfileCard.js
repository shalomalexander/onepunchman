import DProfileForm from "../Forms/DProfileForm";
import { useEffect, useState, useContext } from "react";
import { loginContext, urlContext } from "../App";
import axios from "axios";

const DProfileCard = () => {
  const url = useContext(urlContext);
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => {
    setShowModal((prevData) => !prevData);
    
  };

  const { state } = useContext(loginContext);

  const [data, setData] = useState({
    name: "",
    licenseNumber: "",
    mobileNumber: "",
    profile: "",
    address: "",
    // orgId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
     let response = null;
      try {
          response = await axios.get(
          url + `/api/v1/MedicalPractitionerInfoDetail/` + state.user.id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Token " + state.token,
            },
          }
        );
      
        setData((prevData) => {
          return {
            ...prevData,
            name: response.data[0]["name"],
            licenseNumber: response.data[0]["licenseNumber"],
            mobileNumber: response.data[0]["mobileNumber"],
            profile: response.data[0]["profile"],
            address: response.data[0]["address"],
            orgId: response.data[0]["orgId"],
          };
        });
      } catch (err) {
        console.log(err.response);
      };
    };
    fetchData();
  },[url, state]);

  return (
    <>
      <div className="detail-container dark-card">
        <div className="inside-container row">
          <div className="col-9">
            <h3>Profile Information</h3>
          </div>
          <div className="col-3">
            <button onClick={toggleShowModal} className="btn btn-primary">
              Edit
            </button>
          </div>
        </div>
        <hr />
        <DProfileForm showModal={showModal} setShowModal={setShowModal} />
        <div className="inside-container row">
          <p>
            <strong>Username:</strong> {data["name"]}
          </p>
          <p>
            <strong>License Number:</strong> {data["licenseNumber"]}
          </p>
          <p>
            <strong>Mobile Number:</strong> {data["mobileNumber"]}
          </p>
        </div>
        <div className="inside-container row">
          <p>
            <strong>Profile:</strong> {data["profile"]}
          </p>
          <p>
            <strong>Address:</strong> {data["address"]}
          </p>
          <p>
            <strong>ORG ID:</strong> {data["orgId"]}
          </p>
        </div>
      </div>
    </>
  );
};

export default DProfileCard;
