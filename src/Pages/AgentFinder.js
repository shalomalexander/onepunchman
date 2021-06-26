import React, { useState } from "react";
import Select from "react-select";

const AgentFinder = () => {
  const agents = [
    {
      name: "Federick",
      contact: "9873631467",
      rating: "4",
      tags: "cancer, covid",
    },
    { name: "Aman", contact: "9873631467", rating: "3", tags: "cancer, covid" },
    {
      name: "Saurabh",
      contact: "9873631467",
      rating: "5",
      tags: "cancer, accident",
    },
    {
      name: "John Maxwell",
      contact: "9873631467",
      rating: "4",
      tags: "heart, cancer",
    },
    {
      name: "Peter Gregly",
      contact: "9873631467",
      rating: "4",
      tags: "heart, covid, accident",
    },
  ];
  const data = [
    {
      value: "cancer",
      label: "CANCER",
    },
    {
      value: "hiv",
      label: "HIV/AIDS",
    },
    {
      value: "covid",
      label: "COVID-19",
    },
    {
      value: "accident",
      label: "ACCIDENT",
    },
    {
      value: "heart",
      label: "HEART AILMENTS",
    },
  ];

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState([]);

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };


  return (
    <>
      <div className="content-inner">
        <div className="row my-3 py-2">
          <div className="col  my-3 py-2">
            <h3>Insurence Agents : </h3>
          </div>
          <div className="col-md-auto  my-3 py-2">
            <h3 className="float-right">Tags :</h3>
          </div>
          <div className="col my-3 py-2 ">
            <Select
              className="dropdown"
              placeholder="Select Option"
              value={data.filter((obj) => selectedValue.includes(obj.value))} // set selected values
              options={data} // set list of the data
              onChange={handleChange} // assign onChange function
              isMulti
              isClearable
            />

            {selectedValue && (
              <div style={{ marginTop: 20, lineHeight: "25px" }}></div>
            )}
          </div>
        </div>
        <hr></hr>
        <div className="lab-report-upload-file-container my-3 py-2">
          <table className="table my-3 py-2 table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Agent Name</th>
                <th scope="col">Contacts</th>
                <th scope="col">Tag</th>
                <th scope="col">Rating</th>
              </tr>
            </thead>

            <tbody>
              {selectedValue.map((v, index) => {
                return agents
                  .filter((p) => p.tags.includes(v))
                  .map((agent, index1) => (
                    <tr>
                      <td>{agent.name}</td>
                      <td>{agent.contact}</td>
                      <td>{v}</td>
                      <td>
                        <ul>
                          {[...Array(parseInt(agent.rating))].map((i, j) => (
                            <span key={i} className="fa fa-star checked"></span>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ));
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AgentFinder;
