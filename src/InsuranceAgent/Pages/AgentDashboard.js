import RecentActivities from "../../components/RecentActivities"
import AgentProfileCard from "./AgentProfileCard";


const AgentDashboard = () => {
  return (
    <>
    <div className="content-inner">
      <p className="bold-300">Dashboard</p>
      <hr />
      <AgentProfileCard />
      <RecentActivities />
    </div>  
    </>
  );
};

export default AgentDashboard;
