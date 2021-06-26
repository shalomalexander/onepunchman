import { useEffect, useState, useContext } from "react";
import { loginContext, urlContext } from "../../App";
import axios from "axios";

const UserRequests = () => {
  const [pending, setPending] = useState([]);
  const url = useContext(urlContext);
  const { state } = useContext(loginContext);
  const [user, setUser] = useState({
    firstName: "",
  });


  const fetchUser = async (id) => {
    let response = await axios.get(
      url + "/api/v1/PersonalInfoOfSpecificUser/" + id
    );

    setUser(response.data);

    console.log(user);
  };

  const handleApprove = (id) => {
    console.log(id);

    // axios.put(url+"/api/v1/patienttoagentreqeust/"+id, patch).then().catch(error=>console.log(error));
  };

  const handleDecline = (id) => {
    console.log(id);
  };

  useEffect(() => {
    const fetchPendingRequests = async () => {
      let response = await axios.get(url + "/api/v1/patienttoagentreqeust/");
      setPending(response.data.filter((d) => d.agentId === state.user.id));
    //   console.log(response);
    };
    fetchPendingRequests();
  }, [url, state.user.id]);

  return (
    <>
      <div className="content-inner">
        <p className="bold-300">Pending Request</p>
        <hr />
        <div className="lab-report-upload-file-container my-3 py-2  table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">User ID</th>
                <th scope="col">Created on</th>
                <th scope="col">Health Risk</th>
                <th scope="col">Tags</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((data, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{data.userId}</td>
                    <td>{data.created_on}</td>
                    <td>{data.healthrisk}</td>
                    <td>{data.tags}</td>
                    <td className="row">
                      <div
                        className="btn btn-primary col"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => fetchUser(data.userId)}
                      >
                        View User
                      </div>
                      <div
                        className="btn btn-success col"
                        onClick={() => handleApprove(data.id)}
                      >
                        Approve
                      </div>
                      <div
                        className="btn btn-danger col"
                        onClick={() => handleDecline(data.id)}
                      >
                        Decline
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
          tabindex="-1"
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
                <table className="table">
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

export default UserRequests;
