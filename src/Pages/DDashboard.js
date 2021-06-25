import DoctorProfileCard from "../components/DoctorProfileCard";
import RecentActivities from "../components/RecentActivities";

const DDashboard = () => {
  return (
    <>
      <div className="content-inner">
        <p className="bold-300">Dashboard</p>
        <hr />
        <DoctorProfileCard />
        <RecentActivities />
      </div>
    </>
  );
};

export default DDashboard;
