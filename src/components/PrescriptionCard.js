import React from "react";

const PrescriptionCard = (props) => {
  const {
    prescriberId,
    hospitalOrClinic,
    doctorName,
    prescriptionDate,
    contactNumber,
    address,
    symptoms,
    medicines,
    notes,
  } = props.data;

  return (
    <>
      <div className="table-inner">
        <table
          className="table table-bordered table-success"
          id="invoice-table"
        >
          <tbody>
            <tr>
              <th className="w-25">Prescriber Id</th>
              <td>{prescriberId}</td>
            </tr>
            <tr>
              <th className="w-25">Hospital or Clinic</th>
              <td>{hospitalOrClinic}</td>
            </tr>
            <tr>
              <th className="w-25">Doctor's Name</th>
              <td>{doctorName}</td>
            </tr>
            <tr>
              <th className="w-25">Date</th>
              <td>{prescriptionDate}</td>
            </tr>
            <tr>
              <th className="w-25">Contact Number</th>
              <td>{contactNumber}</td>
            </tr>
            <tr>
              <th className="w-25">Address</th>
              <td>{address}</td>
            </tr>
            <tr>
              <th className="w-25">Symptoms</th>
              <td>{symptoms}</td>
            </tr>
            <tr>
              <th className="w-25">Medicines</th>
              <td>{medicines}</td>
            </tr>
            <tr>
              <th className="w-25">Notes</th>
              <td>{notes}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PrescriptionCard;
