import { useContext, useState } from "react";
import { urlContext, loginContext } from "../App";
import "../css/AccessByFP.css";
import img from "../assets/Images/default.jpg";
import profile_img from "../assets/Images/profile.png";
import { genders } from "../LabelValue";
import toast from "react-hot-toast";
import axios from "axios";

const AccessByFP = () => {
  const url = useContext(urlContext);
  const {state} = useContext(loginContext);

  const [data, setData] = useState({
    fingerprint: "",
    gender: "",
  });

  const [temp, setTemp] = useState("");

  const [patients, setPatients] = useState([]);

  const handleInputChange = (event) => {
    const { name } = event.target;
    const value = event.target.files[0];

    setData((prevData) => {
      return { ...prevData, [name]: value };
    });

    //To show the image temporarly
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setTemp(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSearch = async (event) => {
    toast.loading("Fetching Data!", { duration: 1000 });

    if (event) {
      event.preventDefault();
    }

    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    //Appending key="did" and value="Doctors Id"
    formData.append("did", state.user.id)
    // console.log(formData);

    await axios
      .post(url + "/api/v1/fingerprint/match/", formData)
      .then((res) => {
        setPatients([res.data]);
        if (res.data.length === 0) {
          toast("No user found", {
            icon: "⚠️",
          });
        } else {
          toast.success("Successful, User Found");
          // console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
        toast.error("There was some error");
      });
  };

  const handleClear = () => {
    setData({ fingerprint: "", gender: "" });
    console.log(data);
    window.location.reload(false);
  };

  const [allergy, setAllergy] = useState([]);
  const handleRequest = (id) => {
    const fetchData = async () => {
      let response = await axios.get(url + "/api/v1/allergicinfo/");
      // console.log(response.data);
      setAllergy(response.data.filter((d) => d.userId === id));
    };

    fetchData();
  };

  return (
    <>
      <div className="">
        <strong style={{ fontSize: "25px" }}>Access by Fingerprint</strong>
        <hr />
        <div className="table-responsive-sm">
          <table className="table table-success">
            <thead className="table-borderless">
              <tr>
                <th scope="col">Fingerprint Image</th>
                <th scope="col" className="w-10">
                  Upload Fingerprint
                </th>
                <th scope="col">Gender</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {data.fingerprint !== "" ? (
                    <>
                      <img className="image-container" src={temp} alt="#" />
                    </>
                  ) : (
                    <>
                      <img
                        className="table-image-container"
                        src={img}
                        alt="#"
                      />
                    </>
                  )}
                </td>
                <td>
                  <input
                    name="fingerprint"
                    onChange={handleInputChange}
                    type="file"
                    accept="image/*"
                  />
                </td>
                <td>
                  <select
                    name="gender"
                    value={data.gender}
                    className="form-control"
                    onChange={handleSelectChange}
                  >
                    {genders.map((gender, index) => (
                      <option key={index} value={gender.value}>
                        {gender.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button className="btn btn-secondary" onClick={handleClear}>
                    Clear
                  </button>
                </td>
                <td>
                  <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Photo</th>
                <th scope="col">Patient ID</th>
                <th scope="col">Name</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Alternate Number</th>
                <th scope="col">Blood Group</th>
                <th scope="col">Request</th>
              </tr>
            </thead>
            {patients.length === 0 ? (
              <></>
            ) : (
              <tbody>
                {patients[0].map((patient, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>
                        <img
                          className="table-image-container"
                          src={
                            patient.profilePicture.length === 0
                              ? profile_img
                              : patient.profilePicture
                          }
                          alt="#"
                        />
                      </td>
                      <td>{patient.user}</td>
                      <td>{patient.firstName}</td>
                      <td>{patient.mobileNumber}</td>
                      <td>{patient.alternateMobileNumber}</td>
                      <td>{patient.bloodGroup}</td>
                      <td>
                        <button
                          onClick={() => handleRequest(patient.user)}
                          className="btn btn-warning"
                          data-toggle="modal"
                          data-target="#exampleModalLong"
                        >
                          Request
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
        <div
          className="modal fade"
          id="exampleModalLong"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Allergic Information
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="lab-report-upload-file-container my-3 py-2  table-responsive">
                  <table className="table table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Allergy</th>
                        <th scope="col">Note</th>
                        <th scope="col">Created on</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allergy.map((a, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{a.allergy}</td>
                            <td>{a.note}</td>
                            <td>{a.created_on}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessByFP;
