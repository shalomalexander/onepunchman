import React from "react";
import Modal from "react-bootstrap/Modal";


const InsuranceForm = ({
  showModal,
  setShowModal,
  handleSubmit,
  handleInputChange,
  insuranceInfo,
}) => {
  return (
    <>
      <Modal
        show={showModal}
        onHide={setShowModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Enter Insurance Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="">
            <div className="input-row">
              <div className="col input_field">
                <label>Insurance Provider</label>
                <input
                  className="form-control "
                  type="text"
                  name="insuranceProvider"
                  onChange={handleInputChange}
                  value={insuranceInfo.insuranceProvider}
                  autoComplete="off"
                />
              </div>
              <div className="col input_field">
                <label>Policy Number</label>
                <input
                  className="form-control"
                  type="text"
                  name="policyNumber"
                  onChange={handleInputChange}
                  value={insuranceInfo.policyNumber}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="input-row">
              <div className="col input_field">
                <label>Policy Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="policyName"
                  onChange={handleInputChange}
                  value={insuranceInfo.policyName}
                  autoComplete="off"
                />
              </div>
              <div className="col input_field">
                <label>validity</label>
                <input
                  className="form-control"
                  type="date"
                  name="validTill"
                  onChange={handleInputChange}
                  value={insuranceInfo.validTill}
                  autoComplete="off"
                />
              </div>
            </div>
            <hr/>
            <div className="input-row">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InsuranceForm;
