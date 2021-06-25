import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { loginContext, urlContext } from "../App";
import DP from "../assets/Images/diseasePrediction.jpg";
import toast from "react-hot-toast";

const Prediction = () => {
  const [items] = useState([
    { label: "Blank", value: "" },
    { label: "Itching", value: "itching" },
    { label: "Skin Rash", value: "skin_rash" },
    { label: "Nodal Skin Eruptions", value: "nodal_skin_eruptions" },
    { label: "Continuous Sneezing", value: "continuous_sneezing" },
    { label: "Shivering", value: "shivering" },
    { label: "Chills", value: "chills" },
    { label: "Joint Pain", value: "joint_pain" },
    { label: "Stomach Pain", value: "stomach_pain" },
    { label: "Acidity", value: "acidity" },
    { label: "Ulcers On Tongue", value: "ulcers_on_tongue" },
    { label: "Muscle Wasting", value: "muscle_wasting" },
    { label: "Vomiting", value: "vomiting" },
    { label: "Burning Micturition", value: "burning_micturition" },
    { label: "Spotting Urination", value: "spotting_urination" },
    { label: "Fatigue", value: "fatigue" },
    { label: "Weight Gain", value: "weight_gain" },
    { label: "Anxiety", value: "anxiety" },
    { label: "Cold Hands And Feets", value: "cold_hands_and_feets" },
    { label: "Mood Swings", value: "mood_swings" },
    { label: "Weight Loss", value: "weight_loss" },
    { label: "Restlessness", value: "restlessness" },
    { label: "Lethargy", value: "lethargy" },
    { label: "Patches In Throat", value: "patches_in_throat" },
    { label: "Irregular Sugar Level", value: "irregular_sugar_level" },
    { label: "Cough", value: "cough" },
    { label: "High Fever", value: "high_fever" },
    { label: "Sunken Eyes", value: "sunken_eyes" },
    { label: "Breathlessness", value: "breathlessness" },
    { label: "Sweating", value: "sweating" },
    { label: "Dehydration", value: "dehydration" },
    { label: "Indigestion", value: "indigestion" },
    { label: "Headache", value: "headache" },
    { label: "Yellowish Skin", value: "yellowish_skin" },
    { label: "Dark Urine", value: "dark_urine" },
    { label: "Nausea", value: "nausea" },
    { label: "Loss Of Appetite", value: "loss_of_appetite" },
    { label: "Pain Behind The Eyes", value: "pain_behind_the_eyes" },
    { label: "Back Pain", value: "back_pain" },
    { label: "Constipation", value: "constipation" },
    { label: "Abdominal Pain", value: "abdominal_pain" },
    { label: "Diarrhoea", value: "diarrhoea" },
    { label: "Mild Fever", value: "mild_fever" },
    { label: "Yellow Urine", value: "yellow_urine" },
    { label: "Yellowing Of Eyes", value: "yellowing_of_eyes" },
    { label: "Acute Liver Failure", value: "acute_liver_failure" },
    { label: "Fluid Overload", value: "fluid_overload" },
    { label: "Swelling Of Stomach", value: "swelling_of_stomach" },
    { label: "Swelled Lymph Nodes", value: "swelled_lymph_nodes" },
    { label: "Malaise", value: "malaise" },
    {
      label: "Blurred And Distorted Vision",
      value: "blurred_and_distorted_vision",
    },
    { label: "Phlegm", value: "phlegm" },
    { label: "Throat Irritation", value: "throat_irritation" },
    { label: "Redness Of Eyes", value: "redness_of_eyes" },
    { label: "Sinus Pressure", value: "sinus_pressure" },
    { label: "Runny Nose", value: "runny_nose" },
    { label: "Congestion", value: "congestion" },
    { label: "Chest Pain", value: "chest_pain" },
    { label: "Weakness In Limbs", value: "weakness_in_limbs" },
    { label: "Fast Heart Rate", value: "fast_heart_rate" },
    {
      label: "Pain During Bowel Movements",
      value: "pain_during_bowel_movements",
    },
    { label: "Pain In Anal Region", value: "pain_in_anal_region" },
    { label: "Bloody Stool", value: "bloody_stool" },
    { label: "Irritation In Anus", value: "irritation_in_anus" },
    { label: "Neck Pain", value: "neck_pain" },
    { label: "Dizziness", value: "dizziness" },
    { label: "Cramps", value: "cramps" },
    { label: "Bruising", value: "bruising" },
    { label: "Obesity", value: "obesity" },
    { label: "Swollen Legs", value: "swollen_legs" },
    { label: "Swollen Blood Vessels", value: "swollen_blood_vessels" },
    { label: "Puffy Face And Eyes", value: "puffy_face_and_eyes" },
    { label: "Enlarged Thyroid", value: "enlarged_thyroid" },
    { label: "Brittle Nails", value: "brittle_nails" },
    { label: "Swollen Extremeties", value: "swollen_extremeties" },
    { label: "Excessive Hunger", value: "excessive_hunger" },
    { label: "Extra Marital Contacts", value: "extra_marital_contacts" },
    { label: "Drying And Tingling Lips", value: "drying_and_tingling_lips" },
    { label: "Slurred Speech", value: "slurred_speech" },
    { label: "Knee Pain", value: "knee_pain" },
    { label: "Hip Joint Pain", value: "hip_joint_pain" },
    { label: "Muscle Weakness", value: "muscle_weakness" },
    { label: "Stiff Neck", value: "stiff_neck" },
    { label: "Swelling Joints", value: "swelling_joints" },
    { label: "Movement Stiffness", value: "movement_stiffness" },
    { label: "Spinning Movements", value: "spinning_movements" },
    { label: "Loss Of Balance", value: "loss_of_balance" },
    { label: "Unsteadiness", value: "unsteadiness" },
    { label: "Weakness Of One Body Side", value: "weakness_of_one_body_side" },
    { label: "Loss Of Smell", value: "loss_of_smell" },
    { label: "Bladder Discomfort", value: "bladder_discomfort" },
    { label: "Foul Smell Of Urine", value: "foul_smell_of_urine" },
    { label: "Continuous Feel Of Urine", value: "continuous_feel_of_urine" },
    { label: "Passage Of Gases", value: "passage_of_gases" },
    { label: "Internal Itching", value: "internal_itching" },
    { label: "Toxic Look (typhos)", value: "toxic_look_(typhos)" },
    { label: "Depression", value: "depression" },
    { label: "Irritability", value: "irritability" },
    { label: "Muscle Pain", value: "muscle_pain" },
    { label: "Altered Sensorium", value: "altered_sensorium" },
    { label: "Red Spots Over Body", value: "red_spots_over_body" },
    { label: "Belly Pain", value: "belly_pain" },
    { label: "Abnormal Menstruation", value: "abnormal_menstruation" },
    { label: "Dischromic Patches", value: "dischromic_patches" },
    { label: "Watering From Eyes", value: "watering_from_eyes" },
    { label: "Increased Appetite", value: "increased_appetite" },
    { label: "Polyuria", value: "polyuria" },
    { label: "Family History", value: "family_history" },
    { label: "Mucoid Sputum", value: "mucoid_sputum" },
    { label: "Rusty Sputum", value: "rusty_sputum" },
    { label: "Lack Of Concentration", value: "lack_of_concentration" },
    { label: "Visual Disturbances", value: "visual_disturbances" },
    {
      label: "Receiving Blood Transfusion",
      value: "receiving_blood_transfusion",
    },
    {
      label: "Receiving Unsterile Injections",
      value: "receiving_unsterile_injections",
    },
    { label: "Coma", value: "coma" },
    { label: "Stomach Bleeding", value: "stomach_bleeding" },
    { label: "Distention Of Abdomen", value: "distention_of_abdomen" },
    {
      label: "History Of Alcohol Consumption",
      value: "history_of_alcohol_consumption",
    },
    { label: "Fluid Overload", value: "fluid_overload" },
    { label: "Blood In Sputum", value: "blood_in_sputum" },
    { label: "Prominent Veins On Calf", value: "prominent_veins_on_calf" },
    { label: "Palpitations", value: "palpitations" },
    { label: "Painful Walking", value: "painful_walking" },
    { label: "Pus Filled Pimples", value: "pus_filled_pimples" },
    { label: "Blackheads", value: "blackheads" },
    { label: "Scurring", value: "scurring" },
    { label: "Skin Peeling", value: "skin_peeling" },
    { label: "Silver Like Dusting", value: "silver_like_dusting" },
    { label: "Small Dents In Nails", value: "small_dents_in_nails" },
    { label: "Inflammatory Nails", value: "inflammatory_nails" },
    { label: "Blister", value: "blister" },
    { label: "Red Sore Around Nose", value: "red_sore_around_nose" },
    { label: "Yellow Crust Ooze", value: "yellow_crust_ooze" },
  ]);

  const { state } = useContext(loginContext);
  const url = useContext(urlContext);

  const [symptoms, setSymptoms] = useState({
    s1: "",
    s2: "",
    s3: "",
    s4: "",
    s5: "",
  });

  const [diseases, setDiseases] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSymptoms((prevData) => {
      return { ...prevData, [name]: value };
    });
    console.log(symptoms);
  };

  const handleSubmit = async () => {
    console.log(symptoms);
    await axios
      .post(url + "/api/v1/prediction/", symptoms, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + state.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Predicted Successfully!");
        setDiseases(res.data);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error("Data input is inappropriate. Try again");
      });
  };

  useEffect(() => {}, [diseases]);

  return (
    <>
      <div className="content-inner">
        <p className="bold-300">DISEASE PREDICTION TOOL</p>
        <p>
          <strong>Note: </strong>Use this tool to have insight on the type of
          disease the patient is experiencing based on symptoms
        </p>
        <hr />
        <div className="profile-inner">
          <p>
            <strong>Note: </strong> Select atleast 3 symptoms to generate a prediction.
          </p>

          <div className="input-col">
            <select
              id="s1"
              name="s1"
              className="form-control select-dropdown"
              onChange={handleChange}
            >
              {items.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <select
              id="s2"
              name="s2"
              className="form-control select-dropdown"
              onChange={handleChange}
            >
              {items.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <select
              id="s3"
              name="s3"
              className="form-control select-dropdown"
              onChange={handleChange}
            >
              {items.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <select
              id="s4"
              name="s4"
              className="form-control  select-dropdown"
              onChange={handleChange}
            >
              {items.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <select
              id="s5"
              name="s5"
              className="form-control  select-dropdown"
              onChange={handleChange}
            >
              {items.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <button className="btn btn-dark" onClick={handleSubmit}>
              Predict
            </button>
          </div>
        </div>
        <hr />
        <div className="profile-inner">
          <h3>Predicted Diseases</h3>
          <div className="input-row">
            <div className="">
              {diseases.length === 0 ? (
                <div className="">
                  <p>
                    <strong>Note:</strong> You have not predicted anything.
                  </p>
                  <div className="">
                    <div className="li-list">NULL</div>
                  </div >
                </div>
              ) : (
                <div>
                  <p>
                    <strong>Note:</strong> The patient may be suffering from
                    these diseases.
                  </p>

                  {diseases.map((disease, index) => (
                    <div className="input-row">
                      <div key={index} className="col li-list">
                        {disease}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col">
              <img className="home-1-img" src={DP} alt="#" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prediction;
