import { useEffect, useContext, useState } from "react";
import { loginContext, urlContext } from "../App";
// import toast from "react-hot-toast";
import axios from "axios";

const EnrolledPolicy = () => {
  const url = useContext(urlContext);
  const { state } = useContext(loginContext);
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      let response = await axios
        .get(url + "/api/v1/enrollinsurance/")
        .catch((error) => {
          console.log(error);
        });
      setData(response.data.filter(d=> d.userId === state.user.id))
    };
    fetchData();
  }, [url, state]);

  return (
    <>
      <div className="content-inner">
        <p className="bold-300">Approved Insurance Policy's</p>
        <hr />
        <div className="lab-report-upload-file-container my-3 py-2  table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Enrollment ID</th>
                <th scope="col">Created on</th>
                <th scope="col">Expiry Date</th>
                <th scope="col">Policy Name</th>
                <th scope="col">Policy Number</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{data.id}</td>
                    <td>{data.created_on}</td>
                    <td>{data.validTill}</td>
                    <td>{data.policyName}</td>
                    <td>{data.policyNumber}</td>
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

export default EnrolledPolicy;
