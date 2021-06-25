import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { urlContext } from "../App";
import toast from "react-hot-toast";

const RequestCard = (props) => {
  const url = useContext(urlContext);
  const { id, username, phone_number } = props.value;
  const did = props.did;

  const [pField, setPfield] = useState({
    prescription_field: false,
  });

  const [data, setData] = useState({
    otp: "",
    verify_otp: false,
    pid: "",
    did: "",
    prescription_field: false,
    blood_pressure_field: false,
  });

  const onChangeHandler = (event) => {
    const { name } = event.target;
    if (name === "prescription_field") {
      setPfield((prevData) => {
        return { ...prevData, [name]: event.target.checked };
      });
    }

    setData((prevData) => {
      return {
        ...prevData,
        prescription_field: event.target.checked,
        pid: id,
        did: did,
      };
    });
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    localStorage.setItem("pid", id);
    console.log(data);

    if(!data.prescription_field) {
      toast.error("Kindly select a field.")
      return;
    }

    axios
      .post(url + "/api/v1/accessverification/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        toast.success(`One Time Password sending to:- ${phone_number}`, {
          duration: 8000,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("There was some error. Please try again");
      });
  };

  useEffect(() => {}, [pField.prescription_field, data]);

  return (
    <>
      <div className="table-inner">
        <h3>Request Patient Detail</h3>
        <table className="table table-boardered table-info">
          <tbody>
            <tr>
              <th className="w-25">ID:</th>
              <td>{id}</td>
            </tr>
            <tr>
              <th className="w-25">Username:</th>
              <td>{username}</td>
            </tr>
            <tr>
              <th className="w-25">Phone Number:</th>
              <td>{phone_number}</td>
            </tr>
            <tr>
              <th className="w-25">Prescribtion Field</th>
              <td>
                <input
                  type="checkbox"
                  className="checkbox-container  col-1"
                  placeholder=""
                  name="prescription_field"
                  checked={pField.prescription_field}
                  onChange={onChangeHandler}
                />
              </td>
            </tr>
            <tr className="table-danger">
              <th className="w-25">Make Request:</th>
              <td>
                <button onClick={handleSubmit} className="btn btn-dark">
                  Request
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RequestCard;
