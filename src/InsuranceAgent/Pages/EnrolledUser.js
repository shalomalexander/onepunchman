import { useEffect, useContext, useState } from "react";
import {urlContext, loginContext } from "../../App";
// import toast from "react-hot-toast";
import axios from "axios";

const EnrolledUsers = () => {
  const url = useContext(urlContext);
  const { state } = useContext(loginContext);

  const [data, setData] = useState([]);
  const [user, setUser] = useState({
      firstName:"",
  });

  const handleUserDetail = async (id) => {
    let response = await axios.get(
      url + "/api/v1/PersonalInfoOfSpecificUser/" + id
    );

    setUser(response.data);

    // console.log(user);
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios
        .get(url + "/api/v1/enrollinsurance/")
        .catch((error) => {
          console.log(error);
        });
      setData(response.data.filter(d=> d.agentId === state.user.id));
     
    };
    fetchData();
  }, [url, state]);
  
  return (
    <>
      <div className="content-inner">
        <p className="bold-300">Enrolled User</p>
        <hr />
        <div className="lab-report-upload-file-container my-3 py-2  table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Enrollment ID</th>
                <th scope="col">User ID</th>
                <th scope="col">Created on</th>
                <th scope="col">Validation</th>
                <th scope="col">Policy Name</th>
                <th scope="col">Policy Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{data.id}</td>
                    <td>{data.userId}</td>
                    <td>{data.created_on}</td>
                    <td>{data.validTill}</td>
                    <td>{data.policyName}</td>
                    <td>{data.policyNumber}</td>
                    <td>
                      <div
                        className="btn btn-warning"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => {
                          handleUserDetail(data.userId);
                        }}
                      >
                        User Detail
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content ">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  User Detail
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
              <div className="modal-body  table-responsive">
                <table className="table  table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">{user.firstName}</th>
                      <th scope="col">Contact</th>
                      <th scope="col">{user.mobileNumber}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Gender</th>
                      <td>{user.gender}</td>
                      <td>Email ID</td>
                      <td>{user.emailId}</td>
                    </tr>
                    <tr>
                      <th scope="row">Address</th>
                      <td>{user.addressLine}</td>
                      <td>{user.cityOrTown}</td>
                      <td>{user.state}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrolledUsers;
