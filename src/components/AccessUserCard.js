
const AccessUserCard = (props) => {
    const {user, firstName, middleName, lastName, mobileNumber,  emailId } = props.value;
  return (
    <>
       <div className="table-inner">
        <table className="table table-boardered table-info">
          <tbody>
            <tr>
              <th className="w-25">Patient ID:</th>
              <td>{user}</td>
            </tr>
            <tr>
              <th className="w-25">Username:</th>
              <td>{firstName} {middleName} {lastName}</td>
            </tr>
            <tr>
              <th className="w-25">Email ID:</th>
              <td>{emailId}</td>
            </tr>
            <tr>
              <th className="w-25">Phone Number:</th>
              <td>{mobileNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AccessUserCard;
