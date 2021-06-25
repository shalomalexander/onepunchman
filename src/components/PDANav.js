import "../css/PDANav.css";
import { useState } from "react";
import AccessByFP from "../Pages/AccessByFP";
import AccessById from "../Pages/AccessById";

const PDANav = () => {
  const [tabone, setTabone] = useState(true);
  const [tabtwo, setTabtwo] = useState(false);


  const handleTabSwitch = (event) => {
    if(event.target.id === "tab-one") {
      setTabone(true);
      setTabtwo(false);
    } else {
      setTabone(false);
      setTabtwo(true);
    }
  }


  return (
    <>
      <div className="PDANav-wrapper">
        <div className="PDANav-tabs">
          <li className={"PDANav-tab" + (tabone ? " active-tab" : "") } onClick={handleTabSwitch} id="tab-one">ACCESS BY PATIENT ID</li>
          <li className={"PDANav-tab" + (tabtwo ? " active-tab" : "") } onClick={handleTabSwitch} id="tab-two">ACCESS BY FINGERPRINT</li>
        </div>  
        <div className="PDANav-content">
          {tabone ? (<><AccessById/></>):(<><AccessByFP /></>)}
        </div>   
      </div>
    </>
  );
};

export default PDANav;
