import {
  AreaCards,
  AreaCharts,
  AreaTable,
  AreaTop,
  AreaLineChart,
} from "../../components";

const Dashboard = () => {
  return (
    <div className="content-area">
      <AreaTop />
      <AreaCards />
      <AreaCharts />
      <AreaLineChart />
      <AreaTable />
    </div>
  );
};

export default Dashboard;
