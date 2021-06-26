import React, { useState } from 'react';
import Select from 'react-select';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClientFinder = () => {
    const patients = [
        { name: 'shalom', contact: '213233432', healthScore: '40', tags: 'cancer, accident' },
        { name: 'shalom', contact: '213233432', healthScore: '70', tags: 'cancer, heart' },
        { name: 'shalom3', contact: '213233432', healthScore: '33', tags: 'cancer, covid' },
        { name: 'shalom45', contact: '213233432', healthScore: '60', tags: 'covid, heart' },
        { name: 'shalome', contact: '213233432', healthScore: '33', tags: 'cancer, covid' },
        { name: 'shalom', contact: '213233432', healthScore: '78', tags: 'hiv, covid' },
        { name: 'shalom', contact: '213233432', healthScore: '33', tags: 'cancer, accident' },

    ];


    const data = [
        {
            value: 'cancer',
            label: "CANCER"
        },
        {
            value: 'hiv',
            label: "HIV/AIDS"
        },
        {
            value: 'covid',
            label: "COVID-19"
        },
        {
            value: 'acciedent',
            label: "ACCIDENT"
        },
        {
            value: 'heart',
            label: "HEART AILMENTS"
        }
    ];

    // set value for default selection
    const [selectedValue, setSelectedValue] = useState([]);

    // handle onChange event of the dropdown
    const handleChange = (e) => {
        const name = "cancer, covid";
        setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
        console.log(selectedValue);
        const new_value = JSON.stringify(selectedValue, null, 2);
        selectedValue.filter(name => name.includes('cancer')).map(filteredName => (
            console.log(filteredName)
        ));

    }
    return (
        <>
            <div className="container">
                <div className="row my-3 py-2">
                    <div className="col  my-3 py-2">
                        <h3>Potential Buyers </h3>
                    </div>
                    <div className="col-md-auto  my-3 py-2">
                        <h3 className="float-right">Tags  :</h3>
                    </div>
                    <div className="col my-3 py-2 ">
                        <Select
                            className="dropdown"
                            placeholder="Select Option"
                            value={data.filter(obj => selectedValue.includes(obj.value))} // set selected values
                            options={data} // set list of the data
                            onChange={handleChange} // assign onChange function
                            isMulti
                            isClearable
                        />

                        {selectedValue && <div style={{ marginTop: 20, lineHeight: '25px' }}>
                        </div>}

                    </div>
                </div>
                <hr></hr>
                <div className="lab-report-upload-file-container my-3 py-2">
                    <table className="table my-3 py-2 table-bordered">
                        <thead className='thead-dark'>
                            <tr>
                                <th scope="col">Client Name</th>
                                <th scope="col">Contacts</th>
                                <th scope="col">Tag</th>
                                <th scope="col">Health Factor</th>
                            </tr>
                        </thead>
                        <tbody>
                        {selectedValue.map((v, index) => {
                                return (
                                    // <h1>{v}</h1>
                                    patients.filter(p => p.tags.includes(v)).map((patient,index1)=> (
                                        <tr >
                                        <td>{patient.name}</td>
                                        <td>{patient.contact}</td>
                                        <td>{v}</td>
                                        <td><div className="progressBar">
                                            <ProgressBar now={patient.healthScore} label={`${patient.healthScore}% health score`} />
                                        </div></td>
                                    </tr>
                                    ))
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                    <div>
                        {/* <ul>
                            {selectedValue.map((v, index) => {
                                return (
                                    // <h1>{v}</h1>
                                    patients.filter(p => p.tags.includes(v)).map(filteredPerson => (
                                        <li>
                                            {filteredPerson.name}
                                        </li>
                                    ))
                                );
                            })}

                        </ul> */}
                    </div>
                </div>
        </>
    );
}

export default ClientFinder;