import React, { useState, useEffect, useContext } from "react";
import InsuranceCard from "../components/InsuranceCard";
import InsuranceForm from "../Forms/InsuranceForm";
import axios from "axios";

import { loginContext, urlContext } from "../App";
import nodata from "../assets/SVG/HEALHUB-NODATA.svg";

const Insurance = () => {
  const url = useContext(urlContext);
  const { state } = useContext(loginContext);

  const [insurances, setInsurances] = useState([]);

  const [insuranceInfo, setInsuranceInfo] = useState({
    id: "",
    insuranceProvider: "",
    policyNumber: "",
    policyName: "",
    validTill: "",
    userId: "",
  });

  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => {
    setShowModal((prevData) => !prevData);
    console.log(showModal);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInsuranceInfo((prevData) => {
      return { ...prevData, [name]: value };
    });

    setInsuranceInfo((prevData) => {
      return { ...prevData, userId: state.user.token };
    });
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    setInsuranceInfo((prevData) => {
      return { ...prevData, insuranceInfo };
    });
    setInsurances((prevData) => {
      return [...prevData, insuranceInfo];
    });

    //AXIOS POST Request
    axios
      .post(url + "/api/v1/InsuranceInfo/", insuranceInfo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + state.token,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error.response.request._response));

    refreshPage();
  };

  //AXIOS GET REQUEST
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url + `/api/v1/InsuranceInfo/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + state.token,
          },
        });
        setInsurances(response.data);
      } catch (err) {
        console.log(err.response);
      }
    };

    getData();
  }, [state.token, url]);

  //AXIOS DELETE REQUEST
  const deleteItem = async (id) => {
    await axios
      .delete(url + "/api/v1/InsuranceInfo/" + JSON.stringify(id), {
        data: { id: id },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response.request._response);
      });
    //console.log("delete:"+id);
    refreshPage();
    alert("Delete Successful");
  };

  //REFRESH PAGE
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="content-inner">
        <div className="align-centre">
          <div className="col-9">
            <p className="bold-300">Insurance Information</p>
          </div>
          <div className="col">
            <button
              onClick={toggleShowModal}
              className="btn btn-primary btn-sm"
            >
              Add
            </button>
          </div>
        </div>
        <InsuranceForm
          showModal={showModal}
          setShowModal={setShowModal}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          insuranceInfo={insuranceInfo}
        />
        <hr />
        {insurances.length === 0 ? (
          <>
            <div className="no-data-wrapper">
              <img className="home-1-img" src={nodata} alt="#" />
            </div>
          </>
        ) : (
          insurances.map((value, index) => {
            return (
              <InsuranceCard
                data={value}
                key={index}
                id={value.id}
                onSelect={deleteItem}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Insurance;
