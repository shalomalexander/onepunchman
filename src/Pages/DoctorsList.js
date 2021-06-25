import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { loginContext, urlContext } from "../App";
import DoctorsCard from "../components/DoctorsCard";
import nodata from "../assets/SVG/HEALHUB-NODATA.svg";

const DoctorsList = () => {
  const { state } = useContext(loginContext);
  const url = useContext(urlContext);

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + `/api/v1/accessverification/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + state.token,
          },
        });
        setDoctors(response.data);
      } catch (err) {
        console.log(err.response);
      }
    };

    fetchData();
  }, [url, state.token]);

  return (
    <>
      <div className="content-inner">
        <p className="bold-300">Doctors List</p>
        <p>
          <strong>Note: </strong>Here you can see the list of doctors who has
          access to your data.
        </p>
        <hr />
        <div className="">
          {doctors.length === 0 ? (
            <>
              <div className="no-data-wrapper">
                <img className="home-1-img" src={nodata} alt="#" />
              </div>
            </>
          ) : (
            doctors.map((value, index) => {
              return <DoctorsCard data={value} key={index} id={value.id} />;
            })
          )}
          {}
        </div>
      </div>
    </>
  );
};

export default DoctorsList;
