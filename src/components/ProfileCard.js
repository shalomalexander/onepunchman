import React, { useState, useEffect, useContext } from "react";
import { loginContext, urlContext } from "../App";
import axios from "axios";
import ProfileAvatar from "./ProfileAvatar";
import empty from "../assets/SVG/HEALHUB-EMPTY.svg";

const ProfileCard = () => {
  const url = useContext(urlContext);
  const { state } = useContext(loginContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res = null;
      try {
        res = await axios.get(
          url + "/api/v1/PersonalInfoOfSpecificUser/" + state.user.id
        );
        setData(res.data);
      } catch (err) {
        console.log(err.response);
      }
    };

    fetchData();
  }, [url, state]);

  return (
    <>
      <div className="profile-inner">
        {/* <h5>Profile Information</h5>
          <hr /> */}
        {data.length === 0 ? (
          <>
            <div className="input-row">
              <div className="input-col">
                <p>Head to Profile to update it.</p>
                <img className="home-1-img" src={empty} alt="#" />
              </div>
            </div>
          </>
        ) : (
          <div className="row input-row">
            <div className="col  gradient-card">
              <div className="row profile-container">
                <ProfileAvatar />
              </div>
              <div className="row profile-container">
                <p>
                  <strong>
                    {data["firstName"]} {data["middleName"]}{" "}
                    {data["lastName"]}
                  </strong>
                </p>
              </div>
            </div>
            <div className="col font-medium">
              <div className="row">
                <p>
                  <strong>ID:</strong> {data["user"]}
                </p>
                <p>
                  <strong>Email ID:</strong> {data["emailId"]}
                </p>
                <p>
                  <strong>Mobile Number:</strong> {data["mobileNumber"]}
                </p>
              </div>

              <div className="row">
                <p>
                  <strong>Blood Group:</strong> {data["bloodGroup"]}
                </p>
                <p>
                  <strong>Gender:</strong> {data["gender"]}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {data["dateOfBirth"]}
                </p>
              </div>

              <div className="row">
                <p>
                  <strong>Address:</strong> {data["addressLine"]},{" "}
                  {data["cityOrTown"]}, {data["district"]}, {data["state"]},{" "}
                  {data["pin"]}
                </p>
              </div>
            </div>
          </div>
         
        )}
      </div>
    </>
  );
};

export default ProfileCard;
