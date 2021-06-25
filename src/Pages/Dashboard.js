import CovidTracker from "../components/CovidTracker"
import RecentActivities from "../components/RecentActivities"
import UserDashboardCard from "../components/UserDashboardCard";

const Dashboard = () => {
  return (
    <>
    <div className="content-inner">
      <p className="bold-300">Dashboard</p>
      <hr />
      <CovidTracker/>
      <UserDashboardCard/>
      <RecentActivities />
    </div>  
    </>
  );
};

export default Dashboard;
