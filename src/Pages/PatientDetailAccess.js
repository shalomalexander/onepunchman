import PDANav from "../components/PDANav";


const PatientDetailAccess = () => {
  
  return (
    <>
      <div className="content-inner">
        <p className="bold-300">Access Verification Tool</p>
        <p><strong>Note: </strong>Use Access by fingerprint in those cases where the patient is unconscious or is incapable of communication.</p>
        <PDANav/>
      </div>
    </>
  );
};

export default PatientDetailAccess;
