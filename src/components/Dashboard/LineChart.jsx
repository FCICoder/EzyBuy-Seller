import { useContext ,useEffect , useState} from 'react'
import Card from '../UI/Card';
import { Chart } from "primereact/chart";
import { MenuContext } from '../../contexts/Menu';
import axios from "axios";
const LineChart = () => {
  const [customers, setCustomers] = useState([]);
  async function getAllCustomers() {
    try {
      const { data } = await axios.get(`https://nodee-f764.onrender.com/customer`);
      if (data.message === "customers retrieved successfully") {
        setCustomers(data?.customers);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  console.log(customers);
useEffect(()=>{
  getAllCustomers();
},[])
  const menuCtx = useContext(MenuContext)
      const data = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "New CLients",
            data: [customers?.length,
              customers?.length*2,
              customers?.length*5,
              customers?.length*2,
              customers?.length*4,
              customers?.length*3,
              customers?.length*4,
            ],
            fill: false,
            tension: 0.4,
            borderColor: "#7286D3",
          },
          {
            label: "Premium Clients",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderDash: [5, 5],
            tension: 0.4,
            borderColor: "#B08BBB",
          },
          {
            label: "Active Clients",
            data: [12, 51, 62, 33, 21, 62, 45],
            fill: true,
            borderColor: "#A0C3D2",
            tension: 0.4,
            backgroundColor: "#F7F5EB",
          },
        ],
      };
      const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: `${menuCtx.darkMode ? "white" : "gray"}`,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: `${menuCtx.darkMode ? "white" : "gray"}`,
            },
            grid: {
              color: `${menuCtx.darkMode ? "white" : "gray"}`,
            },
          },
          y: {
            ticks: {
              color: `${menuCtx.darkMode ? "white" : "gray"}`,
            },
            grid: {
              color: `${menuCtx.darkMode ? "white" : "gray"}`,
            },
          },
        },
      };
  return (
    <Card>
      <Chart type="line" data={data} options={options} style={{height:'400px'}} />
    </Card>
  );
}

export default LineChart