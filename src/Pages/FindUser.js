import React, { useEffect, useState, useContext } from "react";
import { urlContext, loginContext } from "../App";
import axios from "axios";

import UserCard from "../components/UserCard";



const FindUser = () => {
  
 

  const [search, setSearch] = useState("");
  const [names, setNames] = useState([]);
  

  const filteredNames = names.filter((name) => {
    return name.username.indexOf(search) !== -1;
  });

  const [active, setActive] = useState(false);
  const { state } = useContext(loginContext);
  const url = useContext(urlContext);

  useEffect(() => {
    const fetchDoctor = async () => {
      let response = null;
      try {
        response = await axios.get(
          url + `/api/v1/MedicalPractitionerInfoDetail/` + state.user.id,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Token " + state.token,
            },
          }
        );
        //console.log(response.data[0]["activeIndicator"]);
        if(response.data[0]["activeIndicator"].toString() === "N") {
          setActive(false);
        } else {
          setActive(true);
        }
        // console.log(active);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchDoctor();

    const fetchData = async () => {
      let res = null;
      if(active){
        res = await axios.get(url + "/api/auth/userlist");
        let temp = res.data
        .map((item) => item)
        .filter((mp) => {
          return mp.is_MP === false && mp.is_insurance===false && mp.id !==1;
        });
      setNames(temp);
      }
      
      //console.log(res.data);
      
    };

    fetchData();
  }, [url, state, active]);

  return (
    <>
      <div className="content-inner">
        <div className="input-row">
          <div className="col">
            <p className="bold-300">Find Registered Patient Detail</p>
          </div>
        </div>
        <hr />
        <table className="table">
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  className="form-control"
                  id="myInput"
                  placeholder="Enter username to search"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {filteredNames.map((name, index) => (
          <UserCard value={name} key={index} />
        ))}
      </div>
    </>
  );
};

export default FindUser;
