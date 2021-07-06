import AgentProfileForm from "../../Forms/AgentProfileForm";
import { useEffect, useState, useContext } from "react";
import { loginContext, urlContext } from "../../App";
import axios from "axios";

const AgentProfileCard = () => {
  const url = useContext(urlContext);
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => {
    setShowModal((prevData) => !prevData);
  };

  const { state } = useContext(loginContext);

  const [data, setData] = useState({});

  function isEmpty(ob) {
    for (var i in ob) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    const fetchData = async () => {
      let response = null;
      try {
        response = await axios.get(
          url + `/api/v1/insuranceagent/` + state.user.id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Token " + state.token,
            },
          }
        );
        setData(response.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchData();
  }, [url, state]);

  return (
    <>
      <div className="detail-container dark-card">
        <hr />
        <AgentProfileForm
          showModal={showModal}
          setShowModal={setShowModal}
          uploadedData={data}
        />
        <table className="table">
          <thead>
            <tr className="table-dark">
              <th>
                <h3>Profile Information</h3>
              </th>
              <th>
                <div style={{width:"100px"}}>
                {isEmpty(data) ? (
                  <>
                    <button
                      onClick={toggleShowModal}
                      className="btn btn-primary"
                    >
                      Add
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={toggleShowModal}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                  </>
                )}
                </div>
              </th>
            </tr>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">{data["name"]}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>License Number</td>
              <td>{data["licenseNumber"]}</td>
            </tr>
            <tr>
              <td>Mobile Number</td>
              <td> {data["mobileNumber"]}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{data["description"]}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{data["address"]}</td>
            </tr>
            <tr>
              <td>Organization</td>
              <td>{data["organization"]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AgentProfileCard;
