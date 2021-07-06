import "../css/RecentActivities.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { urlContext, loginContext } from "../App";

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);

  const url = useContext(urlContext);
  const {state} = useContext(loginContext);

  useEffect(()=>{
    const fetchData = async () => {
      let response = await axios.get(url + "/api/v1/recentactivity/");
      // console.log(response.data);
      setActivities(response.data.filter((data)=> data.user === state.user.id))
    }
    fetchData();

  },[url, state]);
  return (
    <div>
      <div className="RecentActivities-wrapper">
        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">
                <strong style={{ fontSize: "25px", color: "white" }}>
                  Recent Activities
                </strong>
              </th>
              <th></th>
            </tr>
            <tr>
              <th scope="col">Activity</th>
              <th scope="col">Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {activities.reverse().map((data, index) => {
              return (

                <tr key={index} >
                  <td>{data.activity}</td>
                  <td>{data.created_on.replace("T"," ").split(".")[0]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivities;
