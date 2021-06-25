import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { loginContext, urlContext } from "../App";
import toast from "react-hot-toast";
import InputComponent from "../components/InputComponent";
import InputSelectComponent from "../components/InputSelectComponent";
import InputDateComponent from "../components/InputDateComponent";
import InputFileComponent from "../components/InputFileComponent";
import ProfileAvatar from "../components/ProfileAvatar";
import { bloodGroups, states, genders }  from "../LabelValue";

const Profile = () => {
  const url = useContext(urlContext);

  const { state } = useContext(loginContext);
 
  const [profile, setProfile] = useState({
    user: "",
    profilePicture: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    emailId: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    addressLine: "",
    cityOrTown: "",
    district: "",
    state: "",
    pin: "",
    aadhaarCardNumber: "",
    fingerprint: "",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleProfilePictureChange = (base64image) => {
    setProfile((prevData)=> {
      return {...prevData, "profilePicture": base64image, user:state.user.id};
    })
  } 

  const handleInputChange = (event) => {
    const { name } = event.target;

    const value =
      event.target.name === "fingerprint"
        ? event.target.files[0]
        : event.target.value;

    setProfile((prevData) => {
      return { ...prevData, [name]: value, user: state.user.id };
    });

    console.log(profile);
  };

  const handleSubmit = (event) => {
    //AXIOS POST Request

    let formData = new FormData();

    for (const [key, value] of Object.entries(profile)) {
      formData.append(key, value);
    }

    axios
      .post(url + "/api/v1/PersonalInfo/", formData)
      .then(() => {
        toast.success("Profile Updated Successfully.");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response.request);
      });
  };

  const isValidHttpUrl = (string) => {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  const handleUpdate = async (event) => {
    if (event) {
      event.preventDefault();
    }

    let formData = new FormData();

    for (const [key, value] of Object.entries(profile)) {
      formData.append(key, value);
    }

    if (typeof profile.fingerprint !== "object" || profile.fingerprint===null) {
      formData.delete("fingerprint");
    }

    if (isValidHttpUrl(profile.profilePicture) || profile.profilePicture===null) {
      formData.delete("profilePicture");
    }

    axios
      .patch(
        url + "/api/v1/PersonalInfoOfSpecificUser/" + state.user.id,
        formData
      )
      .then(() => {
        toast.success("Profile Updated Successfully.");
        setShowUpdate(false);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error("Couldn't Update.");
      });

    
  };

  const handle_Submit = (event) => {
    event.preventDefault();
    if (event.nativeEvent.submitter.name === "PUT") {
      handleUpdate();
    } else {
      handleSubmit();
    }
  };

  const toggleUpdate = () => {
    setShowUpdate(!showUpdate);
  };

  useEffect(() => {
    const fetchData = async () => {
      let response = null;
      try {
        response = await axios.get(
          url + "/api/v1/PersonalInfoOfSpecificUser/" + state.user.id
        );
        if (response.status === 200 ? setIsUpdate(true) : setIsUpdate(false));
        setProfile((prevData) => {
          return {
            ...prevData,
            firstName: response.data["firstName"],
            middleName: response.data["middleName"],
            lastName: response.data["lastName"],
            gender: response.data["gender"],
            dateOfBirth: response.data["dateOfBirth"],
            bloodGroup: response.data["bloodGroup"],
            emailId: response.data["emailId"],
            mobileNumber: response.data["mobileNumber"],
            alternateMobileNumber: response.data["alternateMobileNumber"],
            addressLine: response.data["addressLine"],
            cityOrTown: response.data["cityOrTown"],
            district: response.data["district"],
            state: response.data["state"],
            pin: response.data["pin"],
            aadhaarCardNumber: response.data["aadhaarCardNumber"],
            fingerprint: response.data["fingerprint"],
            profilePicture: response.data["profilePicture"]
          };
        });
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [state.user.id, url, isUpdate]);

  return (
    <>
      <div className="content-inner">
       
        <div className="profile-inner">
          <div className="input-row">
            <p className="bold-300 col">
              Profile{" "}
            </p>
            {isUpdate ? (
                <>
                <div>
                  <button
                    onClick={toggleUpdate}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>
                </div>  
                </>
              ) : (
                <></>
              )}
          </div>
          <hr />
          <form onSubmit={handle_Submit}>
            <div className="input-row">
              <div className="col">
                <ProfileAvatar
                  name="profilePicture"
                  handleProfilePictureChange={handleProfilePictureChange}
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  profilePictureSource = {profile.profilePicture}
                />
              </div>
              <div className="col">
                <InputComponent
                  label="First Name*"
                  name="firstName"
                  value={profile.firstName}
                  placeholder="required"
                  maxLength=""
                  minLength=""
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                  required="required"
                />
              </div>

              <div className="col">
                <InputComponent
                  label="Middle Name"
                  name="middleName"
                  value={profile.middleName}
                  placeholder="Optional"
                  maxLength=""
                  minLength=""
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>

              <div className="col">
                <InputComponent
                  label="Last Name"
                  name="lastName"
                  value={profile.lastName}
                  placeholder="Optional"
                  maxLength=""
                  minLength=""
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>

            <div className="input-row">
              <div className="col">
                <InputSelectComponent
                  label="Gender*"
                  name="gender"
                  value={profile.gender}
                  handleInputChange={handleInputChange}
                  list={genders}
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                />
              </div>

              <div className="col">
                <InputDateComponent
                  label="Date of Birth*"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  handleInputChange={handleInputChange}
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                />
              </div>

              <div className="col">
                <InputSelectComponent
                  label="Blood Group*"
                  name="bloodGroup"
                  value={profile.bloodGroup}
                  handleInputChange={handleInputChange}
                  list={bloodGroups}
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                />
              </div>
            </div>

            <div className="input-row">
              <div className="col">
                <InputComponent
                  label="Email ID"
                  name="emailId"
                  value={profile.emailId}
                  placeholder="required"
                  maxLength=""
                  minLength=""
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>

              <div className="col">
                <InputComponent
                  label="Mobile Number"
                  name="mobileNumber"
                  value={profile.mobileNumber}
                  placeholder="required"
                  maxLength="10"
                  minLength="10"
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="col">
                <InputComponent
                  label="Alternate Mobile Number"
                  name="alternateMobileNumber"
                  value={profile.alternateMobileNumber}
                  placeholder="Optional"
                  maxLength="10"
                  minLength="10"
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="col">
                <InputComponent
                  label="Address Line*"
                  name="addressLine"
                  value={profile.addressLine}
                  placeholder="required"
                  maxLength=""
                  minLength=""
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="col">
                <InputComponent
                  label="City or Town*"
                  name="cityOrTown"
                  value={profile.cityOrTown}
                  placeholder="required"
                  maxLength=""
                  minLength=""
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="col">
                <InputComponent
                  label="District*"
                  name="district"
                  value={profile.district}
                  placeholder="required"
                  maxLength=""
                  minLength=""
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="col">
                <InputSelectComponent
                  label="State*"
                  name="state"
                  value={profile.state}
                  handleInputChange={handleInputChange}
                  list={states}
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                />
              </div>

              <div className="col">
                <InputComponent
                  label="Pin*"
                  name="pin"
                  value={profile.pin}
                  placeholder="required"
                  maxLength="6"
                  minLength="6"
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="col">
                <InputComponent
                  label="Aadhaar Card Number*"
                  name="aadhaarCardNumber"
                  value={profile.aadhaarCardNumber}
                  placeholder="required"
                  maxLength="12"
                  minLength="12"
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="col">
                <InputFileComponent
                  label="Fingerprint"
                  name="fingerprint"
                  value={profile.fingerprint}
                  showUpdate={showUpdate}
                  isUpdate={isUpdate}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>

            <hr />
            <p className="font-small">
              <strong>Note:</strong> When you fill this form and submit it, The
              data will reflect in your dashboard.
            </p>

            {isUpdate ? (
              <>
                {showUpdate ? (
                  <>
                    <div className="input-row">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        name="PUT"
                        value="PUT"
                      >
                        Done
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={toggleUpdate}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div></div>
                )}
              </>
            ) : (
              <button
                // onClick={handleSubmit}
                className="btn btn-primary"
                type="submit"
                name="POST"
                value="POST"
              >
                Save
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
