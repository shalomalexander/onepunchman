// import React, { useState, useEffect, useContext } from "react";
// import { loginContext } from "../App";
// import axios from "axios";

// const TemperatureCard = () => {
//   const { state, dispatch } = useContext(loginContext);
//   const [data, setData] = useState([]);

//   useEffect(async () => {
//     let res = await axios.get(
//       "http://127.0.0.1:8000/api/v1/BodyTemperature/" + state.user.id
//     );
//     console.log(res);
//     setData(res.data);
//     console.log("This is data");
//     console.log(data);
//   }, []);

//   return (
//     <>
//       <div className="inner">
//         <div className="card">
//             <div className="col">
//                 <p><strong>Body Temperature:</strong> {data["temp"]} </p>
//             </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TemperatureCard;
