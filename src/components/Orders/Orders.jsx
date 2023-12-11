import Container from "../UI/Container";
import OrdersData from "./OrdersData";
// import OrdersStats from "./OrdersStats";
import OrderTable from "./OrderTable";

const Orders = () => {
  return <>
    <Container>
      <div className='w-25' style={{ maxHight: "1200px !important" }}>
        <OrdersData  />
      </div>
      <div style={{ gridColumn: "span 2" }}>
        <OrderTable/>
        {/* <OrdersStats /> */}
      </div>
    </Container>
    </>
};

export default Orders;
