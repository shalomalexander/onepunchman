
const UserCard = (props) => {
    const {id, username, email } = props.value;
  return (
    <>

        <table className="table table-inner">
          <tbody>
            <tr>
              <th>ID:</th>
              <td>{id}</td>
            </tr>
            <tr>
              <th>Username:</th>
              <td>{username}</td>
            </tr>
            <tr>
              <th>Email ID:</th>
              <td>{email}</td>
            </tr>
          </tbody>
        </table>
  
    </>
  );
};

export default UserCard;
