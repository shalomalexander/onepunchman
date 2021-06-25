const InputSelectComponent = (props) => {
  return (
    <>
      <strong><label>{props.label}</label></strong>
      {props.showUpdate ? (
        <select
          name={props.name}
          value={props.value}
          className="form-control"
          onChange={props.handleInputChange}
          required
        >
          {props.list.map((gender, index) => (
            <option key={index} value={gender.value}>
              {gender.label}
            </option>
          ))}
        </select>
      ) : (
        <>
          {!props.isUpdate ? (
            <>
              <select
                name={props.name}
                value={props.value}
                className="form-control"
                onChange={props.handleInputChange}
                required
              >
                {props.list.map((gender, index) => (
                  <option key={index} value={gender.value}>
                    {gender.label}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <p className="form-control">{props.value}</p>
            </>
          )}
        </>
      )}
    </>
  );
};

export default InputSelectComponent;
