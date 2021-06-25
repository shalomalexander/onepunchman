import DProfileForm from "../Forms/DProfileForm";
import { useEffect, useState, useContext } from "react";
import { loginContext, urlContext } from "../App";
import axios from "axios";
import "../css/DoctorProfileCard.css";

const DoctorProfileCard = () => {
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
    orgId: "",
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
      }
    };
    fetchData();
  }, [url, state]);

  return (
    <>
      <div className="DoctorProfileCard-wrapper">
        <DProfileForm showModal={showModal} setShowModal={setShowModal} />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">
                <strong style={{ fontSize: "25px", color: "gray" }}>
                  Profile Information
                </strong>
              </th>
              <th scope="col">
                <button onClick={toggleShowModal} className="btn btn-primary">
                  Edit
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="col">Username</th>
              <td>{data.name}</td>
            </tr>
            <tr>
              <th scope="col">License Number</th>
              <td>{data.licenseNumber}</td>
            </tr>
            <tr>
              <th scope="col">Contact Number</th>
              <td>{data.mobileNumber}</td>
            </tr>
            <tr>
              <th scope="col">Profile</th>
              <td>{data.profile}</td>
            </tr>
            <tr>
              <th scope="col">Address</th>
              <td>{data.address}</td>
            </tr>
            <tr>
              <th scope="col">Organization ID</th>
              <td>{data.orgId}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DoctorProfileCard;
