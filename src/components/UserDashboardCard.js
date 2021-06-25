import "../css/UserDashboardCard.css";
import { useState, useEffect } from "react";

const UserDashboardCard = () => {
    const [data, setData] = useState({});

    useEffect(()=>{
        setData(JSON.parse(localStorage.getItem("user")));
    },[]);

    return (
        <>
        <div>
            <table className="table table-bordered">
               <thead className="">
                   <tr>
                       <th>Patient ID</th>
                       <th>Username</th>
                   </tr>
               </thead>
               <tbody>
                   <tr>
                       <td>{data["id"]}</td>
                       <td>{data["username"]}</td>
                   </tr>
               </tbody>         
            </table>    
        </div>    
        </>
    );
}

export default UserDashboardCard;