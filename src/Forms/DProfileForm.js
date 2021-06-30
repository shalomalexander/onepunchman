import React, { useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { loginContext, urlContext } from "../App";
import axios from "axios";

const DProfileForm = ({ showModal, setShowModal, uploadedData }) => {
  const url = useContext(urlContext);
  const { state } = useContext(loginContext);
  const [data, setData] = useState({
    user: uploadedData ? uploadedData.user : "",
    name: uploadedData ? uploadedData.name : "",
    licenseNumber: uploadedData ? uploadedData.licenseNumber : "",
    profile: uploadedData ? uploadedData.profile : "",
    mobileNumber: uploadedData ? uploadedData.mobileNumber : "",
    address: uploadedData ? uploadedData.address : "",
    orgId: uploadedData ? uploadedData.orgId : "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setData((prevData) => {
      return { ...prevData, [name]: value };
    });

    setData((prevData) => {
      return { ...prevData, user: state.user.id };
    });
    console.log(data);
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (event.target.id === "POST") {
      await axios
        .post(url + "/api/v1/MedicalPractitionerInfo/", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + state.token,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data === "ORG_ERROR") {
            alert("This Organization doesn't exist.");
          } else if (res.data === "PHONE_ERROR") {
            alert("This phone number is invalid.");
          } else {
            alert("Profile Updated Successfully.");
          }
        })
        .catch((error) => console.log(error.response.request));
    } else {
      await axios
        .patch(url + "/api/v1/MedicalPractitionerInfoDetail/"+state.user.id, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + state.token,
          },
        })
        .then((res) => {
          console.log(res);
          window.location.reload(false);
        })
        .catch((error) => console.log(error.response.request));
    }
  };

  useEffect(()=>{
    setData(uploadedData);
  },[uploadedData]);

  return (
    <>
      <Modal
        show={showModal}
        onHide={setShowModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Enter Profile Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-row">
              <div className="col ">
                <label>Full Name:</label>
                <input
                  className="form-control "
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  value={data.name}
                  autoComplete="off"
                />
              </div>
              <div className="col ">
                <label>License Number</label>
                <input
                  className="form-control"
                  type="text"
                  name="licenseNumber"
                  onChange={handleInputChange}
                  value={data.licenseNumber}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="input-row">
              <div className="col ">
                <label>Profile</label>
                <input
                  className="form-control"
                  type="text"
                  name="profile"
                  onChange={handleInputChange}
                  value={data.profile}
                  autoComplete="off"
                />
              </div>
              <div className="col ">
                <label>Mobile Number</label>
                <input
                  className="form-control"
                  type="text"
                  name="mobileNumber"
                  onChange={handleInputChange}
                  value={data.mobileNumber}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="input-row">
              <div className="col">
                <label>Address</label>
                <textarea
                  className="form-control"
                  type="text"
                  name="address"
                  onChange={handleInputChange}
                  value={data.address}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="input-row">
              <div className="col">
                <label>Organization Id</label>
                <input
                  className="form-control"
                  type="text"
                  name="orgId"
                  onChange={handleInputChange}
                  value={data.orgId}
                  autoComplete="off"
                />
              </div>
            </div>
            <hr />
            <div className="input-row">
              <button
                className="btn btn-primary"
                type="submit"
                id="POST"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="btn btn-primary"
                type="submit"
                id="PATCH"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DProfileForm;
