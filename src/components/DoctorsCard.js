import axios from "axios";
import { useContext } from "react";
import { loginContext, urlContext } from "../App";

const DoctorsCard = (props) => {
  const { state } = useContext(loginContext);
  const url = useContext(urlContext);

  const data = {
    pid: state.user.id,
    did: props.data.user,
  };

  const onDecline = () => {
    if (window.confirm("Are you sure you want to decline access?")) {
      // Save it!
      console.log("You took the access");
      axios
        .post(url + "/api/v1/accessverificationupdate/", data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error.response.request._response));
    } else {
      // Do nothing!
      console.log("You didnt take access");
    }
    window.location.reload(false);
  };

  return (
    <>
      <div className="table-inner">
        <table className="table table-boardered table-striped table-primary">
          <tbody>
            <tr>
              <th className="w-25">Doctors ID</th>
              <td>{props.data.user}</td>
            </tr>
            <tr>
              <th className="w-25">Doctor's Name</th>
              <td>{props.data.name}</td>
            </tr>
            <tr>
              <th className="w-25">Doctor's Organization ID</th>
              <td>{props.data.orgId.orgName}</td>
            </tr>
            <tr>
              <th className="w-25">Contact Number</th>
              <td>{props.data.mobileNumber}</td>
            </tr>
            <tr>
              <th className="w-25">Take Access</th>
              <td>
                {" "}
                <button
                  className="btn-sm btn-danger"
                  type="submit"
                  onClick={onDecline}
                >
                  Decline Access
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DoctorsCard;
