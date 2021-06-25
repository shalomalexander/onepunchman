import React, { useEffect, useState, useContext } from "react";

import UserCard from "../components/UserCard";
import axios from "axios";
import { urlContext } from "../App";

const FindUser = () => {
  const url = useContext(urlContext);
  const [search, setSearch] = useState("");
  const [names, setNames] = useState([]);

  const filteredNames = names.filter((name) => {
    return name.username.indexOf(search) !== -1;
  });

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get(url + "/api/auth/userlist");
      //console.log(res.data);
      let temp = res.data
        .map((item) => item)
        .filter((mp) => {
          return mp.is_MP === false;
        });
      setNames(temp);
    };
    fetchData();
  }, [url]);

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
