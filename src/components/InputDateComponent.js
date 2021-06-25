import moment from "moment";

const InputDateComponent = (props) => {
  return (
    <>
     <strong><label>{props.label}</label></strong>
      {props.showUpdate ? (
         <input
         className="form-control"
         type="date"
         name={props.name}
         onChange={props.handleInputChange}
         value={props.value}
         autoComplete="off"
         max={moment().format("YYYY-MM-DD")}
         required
       />
      ) : (
        <>
          {!props.isUpdate ? (
            <>
               <input
                  className="form-control"
                  type="date"
                  name={props.name}
                  onChange={props.handleInputChange}
                  value={props.value}
                  autoComplete="off"
                  max={moment().format("YYYY-MM-DD")}
                  required
                />
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

export default InputDateComponent;
