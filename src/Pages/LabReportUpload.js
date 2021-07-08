import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { loginContext, urlContext } from "../App";

const LabReportUpload = () => {
  const [uploadReports, setUploadReports] = useState([]);

  const url = useContext(urlContext);
  const { state } = useContext(loginContext);

  const [data, setData] = useState({
    title: "",
    report: "",
    tag: "",
    report_status: "",
    userId: "",
  });

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    let formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    axios
      .post(url + "/api/v1/labreportlist/", formData)
      .then(() => {
        toast.success("Succesfull");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error("couldn't upload");
      });

    console.log(formData.get("report"));
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prevData) => {
      return { ...prevData, [name]: value };
    });

    console.log(data);
  };

  const handleReportChange = (event) => {
    setData((prevData) => {
      return {
        ...prevData,
        report: event.target.files[0],
        userId: state.user.id,
      };
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete ? ")) {
      await axios
        .delete(url + "/api/v1/labreportdetail/" + id)
        .then(toast.success("Successfully deleted"))
        .catch((error) => {
          console.log(error.response);
        });
    }
    window.location.reload(false);
  };

  const handleVisibility = async (id, is_visible) => {
    let data = {
      is_visible: !is_visible,
    };

    await axios
      .patch(url + "/api/v1/labreportdetail/" + id, data)
      .then((res) => {
        console.log(res);
        toast.success("Visibility is updated");
        setUploadReports([]);
      })
      .catch((error) => {
        console.log(error.response);
      });

  };

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(
        url + "/api/v1/getlabreport/" + state.user.id
      );
      //console.log(response.data);
      setUploadReports(response.data);
    };
    fetchData();
  }, [state, url, uploadReports]);

  return (
    <div className="content-inner">
      <div className="row my-3 py-2">
        <div className="col-sm-10  my-3 py-2">
          <p className="bold-300 col">Upload Lab Report</p>
        </div>
        <div className="col-sm-2  my-3 py-2">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Add
          </button>
        </div>
      </div>
      <hr></hr>

      <div className="lab-report-upload-file-container my-3 py-2  table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Report Status</th>
              <th scope="col">Created on</th>
              <th scope="col">Related to</th>
              <th scope="col"> Visibility </th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {uploadReports.map((uploadReport, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{uploadReport.title}</td>
                  <td>{uploadReport.report_status}</td>
                  <td>{uploadReport.created_on}</td>
                  <td>{uploadReport.tag}</td>
                  <td>
                    {uploadReport.is_visible ? (
                      <div
                        className="btn btn-outline-success"
                        type="button"
                        onClick={() => handleVisibility(uploadReport.id, true)}
                      >
                        Visible
                      </div>
                    ) : (
                      <div
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => handleVisibility(uploadReport.id, false)}
                      >
                        Hidden
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="row">
                      <div className="col-sm-6">
                        <a
                          className="btn btn-primary"
                          href={uploadReport.report}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View
                        </a>
                      </div>
                      <div className="col-sm-6">
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(uploadReport.id);
                          }}
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        className="modal fade "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Upload Lab Report
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-row ">
                  <div className="form-group col-md-6 py-3 ">
                    <label>Title : </label>
                    <input
                      onChange={handleInputChange}
                      name="title"
                      value={data.title}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-6 py-3">
                    <label>Upload Report : </label>
                    <input
                      onChange={handleReportChange}
                      name="report"
                      type="file"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-6 py-3">
                    <label>Tags : </label>
                    <select
                      name="tag"
                      value={data.tag}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="accident">Accident</option>
                      <option value="covid">COVID-19</option>
                      <option value="cancer">Cancer</option>
                      <option value="hiv">HIV/AIDS</option>
                      <option value="heart">Heart Ailments</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6 py-3">
                    <label> Reoprt Status : </label>
                    <select
                      name="report_status"
                      value={data.report_status}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="unhealthy">Unhealthy</option>
                      <option value="moderate">Moderate</option>
                      <option value="healthy">Healthy</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary ">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabReportUpload;
