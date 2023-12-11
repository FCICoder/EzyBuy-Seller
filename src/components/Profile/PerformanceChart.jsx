import { Chart } from "primereact/chart";

export default function PerformanceChart() {
  const data = {
    labels: [
      "Eating",
      "Drinking",
      "Sleeping",
      "Designing",
      "Coding",
      "Cycling",
      "Running",
    ],
    datasets: [
      {
        label: "Selling",
        borderColor: "#8EA7E9",
        pointBackgroundColor: "#B08BBB",
        pointBorderColor: "#B08BBB",
        pointHoverBackgroundColor: "#E97777",
        pointHoverBorderColor: "#E97777",
        data: [65, 59, 90, 81, 56, 55, 40],
      },
      {
        label: "Marketing",
        borderColor: "#B08BBB",
        pointBackgroundColor: "#B08BBB",
        pointBorderColor: "#B08BBB",
        pointHoverBackgroundColor: "#E97777",
        pointHoverBorderColor: "#E97777",
        data: [28, 48, 40, 19, 96, 27, 100],
      },
    ],
  };
  // const options = {
  //   plugins: {
  //     legend: {
  //       labels: {
  //         color: "gray",
  //       },
  //     },
  //   },
  //   scales: {
  //     r: {
  //       grid: {
  //         color: "gray",
  //       },
  //     },
  //   },
  // };

  return (
    <div>
      <Chart
        type="radar"
        data={data}
        options={data}
        className="w-full md:w-30rem"
        style = {{width: '250px'}}
      />
    </div>
  );
}
