import "../css/RecentActivities.css";

const RecentActivities = () => {
  const activities = [
    {
      activity: "You have Registered",
      date: "today",
    },
    {
      activity: "You have logged in",
      date: "now",
    },
  ];
  return (
    <div>
      <div className="RecentActivities-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <strong style={{ fontSize: "25px", color: "gray" }}>
                  Recent Activities
                </strong>
              </th>
              <th></th>
            </tr>
            <tr>
              <th scope="col">Activity</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.reverse().map((data, index) => {
              return (

                <tr key={index}>
                  <td>{data.activity}</td>
                  <td>{data.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivities;
