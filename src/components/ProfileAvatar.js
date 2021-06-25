import React, { useState } from "react";
import Avatar from "react-avatar-edit";
import male from "../assets/Images/profile.png";
import "../css/style.css";
import toast from "react-hot-toast";

const ProfileAvatar = (props) => {
  const [preview, setPreview] = useState(null);
  // const [src, setSrc] = useState(null)
  const [postview, setPostview] = useState(male);
  const [showAvatar, setShowAvatar] = useState(false);

  const onCrop = (preview) => {
    setPreview(preview);
    props.handleProfilePictureChange(preview);
  };

  const onClose = () => {
    setPreview(null);
  };

  const uploadPicture = (event) => {
    setPostview(preview);
    setShowAvatar(false);
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

  const onBeforeFileLoad = (elem) => {
    if(elem.nativeEvent.target.files[0].size > 1700000){
      toast.error("Choose an image of size less than 1.5 MB.")
      elem.nativeEvent.target.value = "";
    };
  }

  return (
    <div className="profile-pic-container">
      {showAvatar ? (
        <div className="modal-profile-upload">
          <Avatar
            width={300}
            height={200}
            onCrop={onCrop}
            onClose={onClose}
            closeIconColor="black"
            shadingColor="white"
            exportAsSquare={true}
            onBeforeFileLoad={onBeforeFileLoad}
            src=""
          />
          <div className="input-row">
            <button
              className="col btn btn-sm btn-primary"
              onClick={uploadPicture}
            >
              OK
            </button>
            <button
              className="col btn btn-sm btn-warning"
              onClick={() => {
                setShowAvatar(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

     
      {isValidHttpUrl(props.profilePictureSource) ? (
        <div
          onClick={() => {
            if (props.showUpdate) {
              setShowAvatar(true);
            }
          }}
          className="profile-postview"
        >
          <img className="postview" src={props.profilePictureSource} alt="postview" />
        </div>
      ) : (
        <div
          onClick={() => {
            if (props.showUpdate) {
              setShowAvatar(true);
            }
          }}
          className="profile-postview"
        >
          <img className="postview" src={postview} alt="postview" />
        </div>
      )}

      <hr />
    </div>
  );
};

export default ProfileAvatar;
