import React from "react";

const InsuranceCard = (props) => {
  const { insuranceProvider, policyNumber, policyName, validTill } = props.data;

  return (
    <>
      <div className="table-inner">
        <table className="table table-boardered table-success">
          <tbody>
            <tr>
              <th className="w-25">Provider</th>
              <td>{insuranceProvider}</td>
            </tr>
            <tr>
              <th className="w-25">Valid Till</th>
              <td>{validTill}</td>
            </tr>
            <tr>
              <th className="w-25">Policy Name</th>
              <td>{policyName}</td>
            </tr>
            <tr>
              <th className="w-25">Policy Number</th>
              <td>{policyNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InsuranceCard;
