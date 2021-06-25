import React, { useState } from "react";


const useProfileForm = (callback) => {
    const [inputs, setInputs] = useState({});
    const handleSubmit = (event) => {
        if(event) {
            event.preventDefault();
        }
        console.log("Submit handled");
        callback();
    }

    const handleInputChange = (event) => {
        event.persist();
        setInputs(
            inputs => ({...inputs, [event.target.name]:[event.target.value]})
        );
    }


    return {
        handleSubmit,
        handleInputChange,
        inputs
    };
}

export default useProfileForm;
