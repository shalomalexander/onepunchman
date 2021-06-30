import "../../css/PDANav.css";
import { useState } from "react";
import PendingRequest from "../Pages/PendingRequest";
import ApprovedRequest from "../Pages/ApprovedRequest";

const URNav = () => {
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
          <li className={"PDANav-tab" + (tabone ? " active-tab" : "") } onClick={handleTabSwitch} id="tab-one">Pending Request</li>
          <li className={"PDANav-tab" + (tabtwo ? " active-tab" : "") } onClick={handleTabSwitch} id="tab-two">Approved Request</li>
        </div>  
        <div className="PDANav-content">
          {tabone ? (<><PendingRequest/></>):(<><ApprovedRequest/></>)}
        </div>   
      </div>
    </>
  );
};

export default URNav;
