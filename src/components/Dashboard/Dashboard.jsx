import Welcome from "./Welcome";
import Container from "../UI/Container";
import Chart2 from "./Chart";
import LastProducts from "./LastProducts";
import MostActiveClients from "./MostActiveClients";
import LineChart from "./LineChart";
const DashboardMain = () => {
  return (
    <Container>
      <Welcome />
      <LastProducts />
      <Chart2 />
      <MostActiveClients />
      <div style={{ gridColumn: "span 2" }}>
        <LineChart />
      </div>
    </Container>
  );
};

export default DashboardMain;
