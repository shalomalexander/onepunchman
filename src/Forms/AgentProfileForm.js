import React, { useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { loginContext, urlContext } from "../App";
import axios from "axios";
import Select from "react-select";
import toast from "react-hot-toast";

const AgentProfileForm = ({ showModal, setShowModal, uploadedData }) => {
  const url = useContext(urlContext);
  const { state } = useContext(loginContext);
  const [data, setData] = useState({
    user: uploadedData ? uploadedData.user : "",
    name: uploadedData ? uploadedData.name : "",
    licenseNumber: uploadedData ? uploadedData.licenseNumber : "",
    description: uploadedData ? uploadedData.description : "",
    mobileNumber: uploadedData ? uploadedData.mobileNumber : "",
    address: uploadedData ? uploadedData.address : "",
    tags: uploadedData ? uploadedData.tags : "",
    organization: uploadedData ? uploadedData.organization : "",
  });

  const tags = [
    {
      value: "cancer",
      label: "CANCER",
    },
    {
      value: "hiv",
      label: "HIV/AIDS",
    },
    {
      value: "covid",
      label: "COVID-19",
    },
    {
      value: "accident",
      label: "ACCIDENT",
    },
    {
      value: "heart",
      label: "HEART AILMENTS",
    },
  ];

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState([]);

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);

    let arr = e.map((x) => x.value);

    setData((prevData) => {
      let str = arr.join(", ");
      return { ...prevData, tags: str };
    });
  };

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
    console.log(event);

    if (event.target.id === "POST") {
      await axios
        .post(url + "/api/v1/insuranceagentlist/", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + state.token,
          },
        })
        .then((res) => {
          console.log(res);
          toast.success("Successfull");
          window.location.reload(false);
        })
        .catch((error) => console.log(error.response.request));
      console.log("POST");
    } else {
      await axios
        .patch(url + "/api/v1/insuranceagent/" + uploadedData.user, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + state.token,
          },
        })
        .then((res) => {
          console.log(res);
          toast.success("Successfull");
          window.location.reload(false);
        })
        .catch((error) => console.log(error.response.request));
      console.log("PATCH");
    }
  };

  useEffect(() => {
    setData(uploadedData);
  }, [uploadedData]);

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
                <label>Description</label>
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  onChange={handleInputChange}
                  value={data.description}
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
                <label>Organization</label>
                <input
                  className="form-control"
                  type="text"
                  name="organization"
                  onChange={handleInputChange}
                  value={data.organization}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="input-row">
              <div className="col">
                <label>Tags</label>

                <Select
                  className="dropdown"
                  placeholder="Select Option"
                  name="tags"
                  value={tags.filter((obj) =>
                    selectedValue.includes(obj.value)
                  )} // set selected values
                  options={tags} // set list of the data
                  onChange={handleChange} // assign onChange function
                  isMulti
                  isClearable
                />
              </div>
            </div>
            <hr />
            <div className="input-row">
              <button className="btn btn-primary" type="submit" name="POST" id="POST" onClick={handleSubmit}>
                Submit
              </button>
              <button className="btn btn-primary" type="submit" name="PATCH" id="PATCH" onClick={handleSubmit}>
                Update
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AgentProfileForm;
