import { useEffect, useState } from "react";
import "../css/CovidTracker.css";
import axios from "axios";

const CovidTracker = () => {
  const [data, setData] = useState({
    confirmed: "",
    recovered: "",
    deaths: "",
    lastUpdate: "",
  });

  const numberWithCommas = (x) => {
    if(x) return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return "";
  }

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get(
        "https://covid19.mathdro.id/api/countries/India/"
      );
      setData((prevData) => {
        return {
          ...prevData,
          confirmed: res.data.confirmed,
          recovered: res.data.recovered,
          deaths: res.data.deaths,
          lastUpdate: res.data.lastUpdate,
        };
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="covid-tracker-outer-wrapper">
        <strong style={{ fontSize: "25px", color: "gray" }}>
          India Covid Statistics
        </strong>
        <div className="covid-tracker-wrapper  row">
          <div
            className="covid-tracker-card col-sm-4"
            style={{ borderBottom: "#8edee6 10px solid" }}
          >
            <strong style={{ fontSize: "20px", color: "gray" }}>
              Infected
            </strong>
            <hr />
            <strong>{numberWithCommas(data.confirmed.value)}</strong>
            <br></br>
            {/* {data.lastUpdate} */}
            {new Date(data.lastUpdate).toDateString()}
            <br></br>
            <br />
            <h6 style={{ color: "#727572" }}>
              Number of active cases of COVID-19
            </h6>
          </div>

          <div
            className="covid-tracker-card col-sm-4"
            style={{ borderBottom: "#add68d 10px solid" }}
          >
            <strong style={{ fontSize: "20px", color: "gray" }}>
              Recovered
            </strong>
            <hr />
            <strong>{numberWithCommas(data.recovered.value)}</strong>
            <br></br>
            {new Date(data.lastUpdate).toDateString()}
            <br></br>
            <br />
            <h6 style={{ color: "#727572" }}>
              Number of recovered cases of COVID-19
            </h6>
          </div>

          <div
            className="covid-tracker-card col-sm-4"
            style={{ borderBottom: "#e68e8e 10px solid" }}
          >
            <strong style={{ fontSize: "20px", color: "gray" }}>Deaths</strong>
            <hr />
            <strong>{numberWithCommas(data.deaths.value)}</strong>
            <br></br>
            {new Date(data.lastUpdate).toDateString()}
            <br></br>
            <br />
            <h6 style={{ color: "#727572" }}>
              Number of deaths caused by COVID-19
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CovidTracker;
