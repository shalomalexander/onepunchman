
const InputComponent = (props) => {

  return (
    <>
      <strong><label>{props.label}</label></strong>

      {props.showUpdate ? (
        <input
          className="form-control"
          type="text"
          name={props.name}
          onChange={props.handleInputChange}
          value={props.value}
          autoComplete="off"
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          minLength={props.minLength}
          required={props.required}
          
        />
      ) : (
        <>
          {!props.isUpdate ? (
            <>
              <input
                className="form-control "
                type="text"
                name={props.name}
                onChange={props.handleInputChange}
                value={props.value}
                autoComplete="off"
                placeholder={props.placeholder}
                maxLength={props.maxLength}
                minLength={props.minLength}
                required={props.required}
              />
            </>
          ) : (
            <>
            {
                props.value ? (<p className="form-control">{props.value}</p>) : (<p className="form-control">NULL</p>)
            }
            </>
          )}
        </>
      )}
    </>
  );
};

export default InputComponent;
