

const InputFileComponent = (props) => {
  return <>  <strong><label>{props.label}</label></strong>

  {props.showUpdate ? (
    //   During First Upload
    <input
      className="form-control"
      type="file"
      accept="image/*"
      name={props.name}
      onChange={props.handleInputChange}
 
      autoComplete="off"
    />
  ) : (
    <>
      {!props.isUpdate ? (
        // During Update
        <>
          <input
            className="form-control "
            type="file"
            accept="image/*"
            name={props.name}
            onChange={props.handleInputChange}
            autoComplete="off"
          />
        </>
      ) : (
        <>
        {
            props.value ? (<img className="image-container" src={props.value} alt="#"/>) : (<p className="form-control">NULL</p>)
        }
        </>
      )}
    </>
  )}
  </>;
};

export default InputFileComponent;
