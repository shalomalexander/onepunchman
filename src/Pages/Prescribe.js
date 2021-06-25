import React, { useContext, useEffect, useState } from "react";
import { loginContext, urlContext } from "../App";
import axios from "axios";
import toast from "react-hot-toast";

const Prescribe = () => {
  const url = useContext(urlContext);
  const { state } = useContext(loginContext);
  const [prescription, setPrescription] = useState({
    addedBy: "Doctor",
    prescriberId: state.user.id,
    symptoms: "",
    medicines: "",
    notes: "",
    userId: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "userId") {
      setPrescription((prevData) => {
        return { ...prevData, [name]: parseInt(value) };
      });
    } else {
      setPrescription((prevData) => {
        return { ...prevData, [name]: value };
      });
    }
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
   
    console.log(prescription);

    await axios
      .post(url + "/api/v1/PrescriptionInfo/", prescription, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + state.token,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.warning(
            "Kindly contact your organization to activate your account."
          );
        } else if (res.status === 201) {
          toast.success("Prescribed successfully");
        }
      })
      .catch((error) => {
        console.log(error.response.request._response);
        toast.error("This didn't work");
      });
  };

 

  useEffect(() => {
    //Run this effect when state.user changes
  }, [state.user]);

  return (
    <>
      <div className="content-inner">
        <p className="bold-300">Prescribe Page</p>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Symptoms</label>
              <textarea
                type="text"
                className="form-control"
                id=""
                placeholder="Symptom1, Symptom2, Symptom3.."
                name="symptoms"
                value={prescription.symptoms}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Medicines</label>
              <textarea
                type="text"
                className="form-control"
                id=""
                placeholder="Medicine1, Medicine2..."
                name="medicines"
                value={prescription.medicines}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label>Notes</label>
              <textarea
                type="text"
                className="form-control"
                id=""
                placeholder="You can recommend direction of usage of medicines, further consultation, disease predicitions here"
                name="notes"
                value={prescription.notes}
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
                value={prescription.userId}
                onChange={handleInputChange}
              />
              <small id="" className="text-muted">
                Enter the user id of user to whom you are prescribing. User can
                get their user id from their Dashboard
              </small>
            </div>
            {/* <div className="form-group col-md-4">
              <label>Added By</label>
              <input
                type="text"
                className="form-control"
                id=""
                placeholder="Doctor or User"
                name="addedBy"
                value={prescription.addedBy}
                onChange={handleInputChange}
              />
            </div> */}
          </div>
          <button type="submit" className="btn btn-primary">
            Prescribe
          </button>
        </form>
      </div>
    </>
  );
};

export default Prescribe;
