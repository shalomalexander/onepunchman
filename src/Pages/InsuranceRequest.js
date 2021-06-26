import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { loginContext, urlContext } from "../App";
import toast from "react-hot-toast";

const InsuranceRequest = () => {
  const url = useContext(urlContext);
  const { state } = useContext(loginContext);
  const [agents, setAgents] = useState([{ user: "" }]);
  const [request, setRequest] = useState({
    userId: "",
    agentId: "",
  });

  const [pending, setPending] = useState([]);

  const handleRequest = (id) => {
    setRequest((prevData) => {
      return { ...prevData, userId: state.user.id, agentId: id };
    });

    console.log(request);
  };

  useEffect(() => {
    const postRequest = () => {
      axios
        .post(url + "/api/v1/patienttoagentreqeust/", request)
        .then(toast.success("Request Done. Kindly wait for response"))
        .catch((error) => console.log(error.response));

      setRequest({});

      console.log(request);
    };

    if (request.userId === state.user.id) {
      if (
        window.confirm(
          "Your Lab Reports will also be shared with the Agent for further process. Click OK to continue."
        )
      ) {
        postRequest();
      }
    }
  }, [request, state.user.id, url]);

  useEffect(() => {
    const fetchAgents = async () => {
      let response = await axios.get(url + "/api/v1/insuranceagentlist/");
      // console.log(response);
      setAgents(response.data);
    };

    const fetchPendingRequests = async () => {
      let response = await axios.get(url + "/api/v1/patienttoagentreqeust/");
      setPending(response.data);
      // console.log(response);
    };

    fetchAgents();
    fetchPendingRequests();
  }, [url]);

  return (
    <>
      <div className="content-inner">
        <p className="bold-300">Available Insurance Providers</p>
        <hr />
        <div className="lab-report-upload-file-container my-3 py-2  table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Agent ID</th>
                <th scope="col">Name</th>
                <th scope="col">contact</th>
                <th scope="col">Description</th>
                <th scope="col">Organization</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((data, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{data.user}</td>
                    <td>{data.name}</td>
                    <td>{data.mobileNumber}</td>
                    <td>{data.description}</td>
                    <td>{data.organization}</td>
                    <td>
                      <div
                        className="btn btn-warning"
                        onClick={() => {
                          handleRequest(data.user);
                        }}
                      >
                        Request
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="content-inner">
        <p className="bold-300">Pending Request</p>
        <hr />
        <div className="lab-report-upload-file-container my-3 py-2  table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Agent ID</th>
                <th scope="col">Created on</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((data, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{data.agentId}</td>
                    <td>{data.created_on}</td>
                    <td>
                      {data.is_approved ? (
                        <div className="btn btn-success">Approved</div>
                      ) : data.is_declined ? (
                        <div className="btn btn-danger"> Declined</div>
                      ) : (
                        <div className="btn btn-warning">Pending</div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InsuranceRequest;
