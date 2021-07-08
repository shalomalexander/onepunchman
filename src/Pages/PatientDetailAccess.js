import PDANav from "../components/PDANav";
import React, { useEffect, useState, useContext } from "react";
import { urlContext, loginContext } from "../App";
import axios from "axios";

const PatientDetailAccess = () => {
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
        if (response.data[0]["activeIndicator"].toString() === "N") {
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
  }, [url, state, active]);

  return (
    <>
      <div className="content-inner">
        <p className="bold-300">Access Verification Tool</p>
        <hr />
        {active ? (
          <>
            <p>
              <strong>Note: </strong>Use Access by fingerprint in those cases
              where the patient is unconscious or is incapable of communication.
            </p>
            <PDANav />
          </>
        ) : (
          <>
            <div className="alert alert-warning" role="alert">
              Kindly check in with you admin. You are not a verified Medical Practitioner. You will be able to access this section once the admin verifies you details.
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PatientDetailAccess;
